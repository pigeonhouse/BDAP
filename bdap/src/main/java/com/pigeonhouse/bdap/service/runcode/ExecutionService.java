package com.pigeonhouse.bdap.service.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.AttrInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 11:28
 */
@Service
public class ExecutionService {

    @Autowired
    LivyDao livyDao;

    /**
     * 给代码传入参数
     *
     * @param nodeInfo
     * @return 完整spark代码
     */
    public String generateCode(NodeInfo nodeInfo) {

        //是否是输入的文件模块
        String filePath = nodeInfo.getFilePath();
        if (filePath!=null) {
            String id = nodeInfo.getId();
            return "val output = spark.read.format(\"csv\").option(\"inferSchema\", \"true\").option(\"header\", \"true\").load(\"" + filePath + "\")\n" +
                    "dfMap += (\"" + id + "\" -> output)\n\n";
        }

        //----------------------根据锚点判断是否需要注入输入参数的语句--------------------
        int[] anchor = nodeInfo.getAnchor();
        int numberOfInput = anchor[0];
        int numberOfOutput = anchor[1];
        String[] sourceIdList = nodeInfo.getSourceIdList();
        StringBuilder inputCodeBuilder = new StringBuilder();
        String inputName = "input";

        //判断有几个输入,input,input_1,input_2...以此类推
        for (int i = 0; i < numberOfInput; i++) {

            if (("prediction").equals(nodeInfo.getGroupName().getElabel()) && i == 0) {
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

        String scalaFilePath = "src/main/resources/static/" + nodeInfo.getGroupName().getElabel() + "/"
                + nodeInfo.getLabelName().getElabel() + ".scala";
        StringBuilder originCodeBuilder = new StringBuilder();
        try {
            FileInputStream inputStream = new FileInputStream(scalaFilePath);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "gbk"));
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

        String mappingDfCode = "";
        for(int i = 0; i < numberOfOutput; i++){
            if (!"machinelearning".equals(nodeInfo.getGroupName().getElabel())) {
                String id = nodeInfo.getId();
                if(i == 0){
                    mappingDfCode += "\ndfMap += (\"" + id +"_" + i + "\" -> output)\n\n";
                } else{
                    mappingDfCode += "\ndfMap += (\"" + id + "_" + i +"\" -> output_" + i + ")\n\n";
                }
            }
        }


        return inputCode + attrsCode + innerCode + mappingDfCode ;
    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
//        String pre = nodeInfo.getCode();
//        String appendSaving = "output.write.parquet(\"" + jobId + ".parquet\")";
//        nodeInfo.setCode(pre + appendSaving + "\n");
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
    public List<ExecutionInfo> executeFlow(List<NodeInfo> flowInfo, LivySessionInfo livySessionInfo) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        codeToRun.append("var dfMap: Map[String, org.apache.spark.sql.DataFrame] = Map() \n");
        for (NodeInfo nodeInfo : flowInfo) {

            String nodeCode = generateCode(nodeInfo);
            codeToRun.append(nodeCode);

            //提交代码，得到一个url，用于前端轮询以查询这次job运行状态
            String resultUrl = livyDao.postCode(codeToRun.toString(), livySessionInfo);
            System.out.println("success!\n" + resultUrl);

            //清空原先的代码，准备下一次提交
            codeToRun = new StringBuilder();
            ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getId(), resultUrl);
            executionInfoList.add(executionInfo);

        }
        return executionInfoList;
    }

}
