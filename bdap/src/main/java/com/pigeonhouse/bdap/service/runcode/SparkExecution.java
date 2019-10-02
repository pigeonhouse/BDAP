package com.pigeonhouse.bdap.service.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.entity.execution.ValueAttributes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution {

    @Autowired
    LivyDao livyDao;
    @Autowired
    SparkCodeDao sparkCodeDao;

    /**
     * 给代码传入参数
     *
     * @param nodeInfo
     * @return 完整spark代码
     */
    public String generateCode(NodeInfo nodeInfo) {

        //--------------根据锚点判断是否需要注入输入参数的语句---------
        ArrayList<Integer> anchor = nodeInfo.getAnchor();
        int numberOfInput = anchor.get(0);
        ArrayList<String> sourceIdList = nodeInfo.getSourceIdList();
        StringBuilder inputCodeBuilder = new StringBuilder();
        String inputName = "input";
        for (int i = 0; i < numberOfInput; i++) {
            if (i != 0) {
                inputName = "input_" + i;
            }
            inputCodeBuilder.append("val " + inputName + " = dfMap(\"" + sourceIdList.get(i) + "\")");
        }

        String inputCode = inputCodeBuilder.append("\n").toString();

        //--------------取出代码文件中的代码段---------------
        String filePath = "src/main/resources/static/" + nodeInfo.getAlgorithmName() + ".scala";
        StringBuilder originCodeBuilder = new StringBuilder();
        try {
            FileInputStream inputStream = new FileInputStream(filePath);
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

        ArrayList<ValueAttributes> attributes = nodeInfo.getAttributes();
        if (attributes != null) {
            for (ValueAttributes attr : attributes) {
                String attrName = attr.getAttrName();
                String attrType = attr.getAttrType();
                Object value = attr.getValue();

                if ("Array[String]".equals(attrType)) {
                    ArrayList<String> colNames = (ArrayList<String>) value;
                    StringBuilder colNameBuilder = new StringBuilder();
                    if (colNames != null) {
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

        String id = nodeInfo.getId();
        String mappingDfCode = "\ndfMap += (\"" + id + "\" -> output)\n\n";

        return inputCode + attrsCode + innerCode + mappingDfCode;
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

            if (nodeInfo.getIsCheckPoint()) {

                //保存output
                //待完成
                codeToRun.append("");

                //生成一个随机的jobId,用于标记这一次job
                UUID uuid = UUID.randomUUID();
                String jobId = uuid.toString().replace("-", "");

                System.out.println("------------------------------");
                System.out.println(codeToRun);
                System.out.println("------------------------------");

                //提交代码，得到一个url，用于前端轮询以查询这次job运行状态
                String resultUrl = livyDao.postCode(codeToRun.toString(), livySessionInfo);
                System.out.println("success!\n" + resultUrl);

                //清空原先的代码，准备下一次提交
//                codeToRun = new StringBuilder();
//                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getId(), jobId, resultUrl);
//                executionInfoList.add(executionInfo);
            }
        }
        return executionInfoList;
    }

}
