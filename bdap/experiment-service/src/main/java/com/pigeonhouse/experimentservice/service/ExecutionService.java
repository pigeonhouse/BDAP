package com.pigeonhouse.experimentservice.service;

import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.ExecutionInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.AttrInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ClassUtils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ExecutionService {

    @Autowired
    LivyService livyService;

    /**
     * 给代码传入参数
     *
     * @param nodeInfo
     * @return 完整spark代码
     */
    public String generateCode(NodeInfo nodeInfo, String userId, String modelType) {

        //是否是输入的文件模块
        String filePath = nodeInfo.getFilePath();
        String fileName = nodeInfo.getLabelName().getLabel();
        if (filePath != null) {
            String id = nodeInfo.getId();
            return "val output = spark.read.orc(\"hdfs:///bdap/students/" + userId + filePath + fileName + "\")\n" +
                    "dfMap += (\"" + id + "_0" + "\" -> output)\n\n";
        }

        //----------------------根据锚点判断是否需要注入输入参数的语句--------------------
        int[] anchor = nodeInfo.getAnchor();
        int numberOfInput = anchor[0];
        int numberOfOutput = anchor[1];
        String[] sourceIdList = nodeInfo.getSourceIdList();
        System.out.println();
        StringBuilder inputCodeBuilder = new StringBuilder();
        String inputName = "input";

        //判断有几个输入,input,input_1,input_2...以此类推
        for (int i = 0; i < numberOfInput; i++) {

            if (("prediction").equals(nodeInfo.getGroupName().getElabel()) && i == 0) {
                inputName = "Model";
                inputCodeBuilder.append("val " + inputName + ": " + modelType + "Model = modelMap(\"" + sourceIdList[i] + "\").asInstanceOf["+ modelType +"Model]\n");
                continue;
            }

            if (i != 0) {
                inputName = "input_" + i;
            }
            //从dfMap中取出存过的dataframe
            inputCodeBuilder.append("val " + inputName + " = dfMap(\"" + sourceIdList[i] + "\")\n");
        }

        String inputCode = inputCodeBuilder.append("\n").toString();
        //-------------------------取出代码文件中的代码段------------------------------

        StringBuilder originCodeBuilder = new StringBuilder();
        try {
            InputStream inputStream = this.getClass().getResourceAsStream("/static/"+nodeInfo.getGroupName().getElabel() + "/"
                    + nodeInfo.getLabelName().getElabel() + ".scala");
            //代码段编码改为UTF-8
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
            String str = null;
            while ((str = bufferedReader.readLine()) != null) {
                originCodeBuilder.append("\n").append(str);
            }
            inputStream.close();
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        String originCode = originCodeBuilder.toString();

        //取出main函数里面的代码
        System.out.println(Arrays.toString(originCode.split("def\\smain.*\\{")));

        String innerCode = originCode.split("def\\smain.*\\{")[1]
                .split("(\\}\\s*)$")[0]
                .split("(\\}\\s*)$")[0];


        //---------------下面开始构造参数赋值语句---------------------

        StringBuilder attrsCodeBuilder = new StringBuilder();

        ArrayList<AttrInfo> attributes = nodeInfo.getAttributes();
        if (attributes != null) {
            for (AttrInfo attr : attributes) {
                String attrName = attr.getLabelName().getElabel();
                String attrType = attr.getValueType();
                Object value = attr.getValue();

                //参数为数组类型，主要用于选择字段的参数
                if ("Array[String]".equals(attrType)) {
                    ArrayList<String> colNames = (ArrayList<String>) value;
                    StringBuilder colNameBuilder = new StringBuilder();
                    if (colNames != null) {
                        //以Array("","")的类型写入scala
                        colNameBuilder.append("Array(");
                        int colNamesLength = colNames.size();
                        for (int i = 0; i < colNamesLength; i++) {
                            if (i != 0) {
                                colNameBuilder.append(",");
                            }
                            colNameBuilder.append("\"" + colNames.get(i) + "\"");
                        }
                        colNameBuilder.append(")");
                    }
                    value = colNameBuilder.toString();
                } else {
                    value = attr.getValue();
                    //如果是String类型的则需要加上双引号
                    if ("String".equals(attrType)) {
                        value = "\"" + value + "\"";
                    }
                }
                attrsCodeBuilder.append("val " + attrName + ": " + attrType + " = " + value)
                        .append("\n");
            }
        }
        String attrsCode = attrsCodeBuilder.toString();

        //----------------------------------------------------
        // 接下去在代码末尾将output以前端生成的id为key，dataframe本身为value存在Map中

        StringBuilder mappingDfCode = new StringBuilder();
        for (int i = 0; i < numberOfOutput; i++) {
            if (!"machinelearning".equals(nodeInfo.getGroupName().getElabel())) {
                String id = nodeInfo.getId();
                if (i == 0) {
                    mappingDfCode.append("\ndfMap += (\"" + id + "_" + i + "\" -> output)\n\n");
                } else {
                    mappingDfCode.append("\ndfMap += (\"" + id + "_" + i + "\" -> output_" + i + ")\n\n");
                }
            } else {
                String id = nodeInfo.getId();
                mappingDfCode.append("modelMap += (\"").append(id).append("_").append(i).append("\" -> Model) \n");
            }
        }

        //把评估结果加入evaluationMap
        if ("evaluation".equals(nodeInfo.getGroupName().getElabel())){
            String id = nodeInfo.getId();
            mappingDfCode.append("evaluationMap += (\"" + id + "_0\" -> evaluationResult)\n");
        }


        return inputCode + attrsCode + innerCode + mappingDfCode;
    }

    /**
     * 执行所有节点
     * 初始化代码
     * for 节点：节点集
     * 从数据库拿出代码填入参数
     * 代码拼接
     * 传参需要上下节点的信息
     *
     * @param flowInfo
     * @return
     */
    public List<ExecutionInfo> executeFlow(List<NodeInfo> flowInfo, LivySessionInfo livySessionInfo, String userId) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        codeToRun.append("var dfMap: Map[String, org.apache.spark.sql.DataFrame] = Map() \n");
        codeToRun.append("var evaluationMap: Map[String, String] = Map()\n");
        codeToRun.append("var modelMap: Map[String, Any] = Map() \n");
        String modelType = null;
        for (NodeInfo nodeInfo : flowInfo) {
            System.out.println(nodeInfo);

            if(("machinelearning").equals(nodeInfo.getGroupName().getElabel())){
                modelType = nodeInfo.getLabelName().getElabel();
            }

            String nodeCode = generateCode(nodeInfo, userId, modelType);
            codeToRun.append(nodeCode);

            //提交代码，得到一个url，用于前端轮询以查询这次job运行状态
            String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(),userId);
            System.out.println("success!\n" + resultUrl);

            //清空原先的代码，准备下一次提交
            codeToRun = new StringBuilder();
            ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getId(), resultUrl);
            executionInfoList.add(executionInfo);
        }
        String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(),userId);
        System.out.println("success!\n" + resultUrl);
        return executionInfoList;
    }


    /**
     * 用于压力测试
     * 将所有语句放在一起执行
     *
     * @param flowInfo
     * @param livySessionInfo
     * @return
     */
    public List<ExecutionInfo> executeFlowForTest(List<NodeInfo> flowInfo, LivySessionInfo livySessionInfo, String userId) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        codeToRun.append("var dfMap: Map[String, org.apache.spark.sql.DataFrame] = Map() \n");
        String modelType = null;
        for (NodeInfo nodeInfo : flowInfo) {

            if(("machinelearning").equals(nodeInfo.getGroupName().getElabel())){
                modelType = nodeInfo.getLabelName().getElabel();
            }

            String nodeCode = generateCode(nodeInfo, userId, modelType);
            codeToRun.append(nodeCode);
        }
        String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(),userId);
        System.out.println("success!\n" + resultUrl);
        return executionInfoList;
    }

}
