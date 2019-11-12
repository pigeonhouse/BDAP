package com.pigeonhouse.experimentservice.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.*;
import com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.AttrInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class ExecutionService {

    @Autowired
    LivyService livyService;

    private String generateDataSourceCode(DataSourceNodeInfo nodeInfo, String userId) {
        String filePath = nodeInfo.getFilePath();
        String fileName = nodeInfo.getLabelName().getLabel();
        String id = nodeInfo.getId();
        return "val output = spark.read.orc(\"hdfs:///bdap/students/" + userId + filePath + fileName + "\")\n" +
                "dfMap += (\"" + id + "_0" + "\" -> output)\n\n";
    }

    private String generateSavedModelCode(SavedModelNodeInfo nodeInfo, String userId) {
        String id = nodeInfo.getId();
        String modelType = nodeInfo.getLabelName().getElabel();
        return "import org.apache.spark.ml." + nodeInfo.getAlgorithmType() + "." + modelType + "Model\n" +
                "val Model = " + modelType + "Model.load(\"hdfs:///bdap/students/" + userId + "/savedModels/" + nodeInfo.getModelId() + "\")\n" +
                "modelMap += (\"" + id + "_0\" -> (\"" + modelType + "Model\" , Model)) \n";
    }

    private String getInputCodeForPrediction(AlgorithmNodeInfo nodeInfo, String modelType) {
        String[] sourceIdList = nodeInfo.getSourceIdList();
        return "val Model: " + modelType + "Model = modelMap(\"" + sourceIdList[0] + "\")._2.asInstanceOf[" + modelType + "Model]\n" +
                "val input = Model\n" +
                "val input_1 = dfMap(\"" + sourceIdList[1] + "\")\n";
    }

    private String getInputCode(AlgorithmNodeInfo nodeInfo) {
        int[] anchor = nodeInfo.getAnchor();
        int numberOfInput = anchor[0];

        String[] sourceIdList = nodeInfo.getSourceIdList();
        StringBuilder inputCodeBuilder = new StringBuilder();
        String inputName = "input";

        //判断有几个输入,input,input_1,input_2...以此类推
        for (int i = 0; i < numberOfInput; i++) {
            if (i != 0) {
                inputName = "input_" + i;
            }
            //从dfMap中取出存过的dataframe
            inputCodeBuilder.append("val " + inputName + " = dfMap(\"" + sourceIdList[i] + "\")\n");
        }
        return inputCodeBuilder.toString() + "\n";
    }

    private String getInnerCode(AlgorithmNodeInfo nodeInfo) {
        StringBuilder originCodeBuilder = new StringBuilder();
        try {
            InputStream inputStream = this.getClass().getResourceAsStream("/static/" + nodeInfo.getGroupName().getElabel() + "/"
                    + nodeInfo.getLabelName().getElabel() + ".scala");
            //代码段编码改为UTF-8
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
            String str;
            while ((str = bufferedReader.readLine()) != null) {
                originCodeBuilder.append("\n").append(str);
            }
            inputStream.close();
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        String originCode = originCodeBuilder.toString();

        String innerCode = originCode.split("def\\smain.*\\{")[1]
                .split("(\\}\\s*)$")[0]
                .split("(\\}\\s*)$")[0];

        return innerCode + "\n";
    }

    private String getAttrsCode(AlgorithmNodeInfo nodeInfo) {
        StringBuilder attrsCodeBuilder = new StringBuilder();

        ArrayList<AttrInfo> attributes = nodeInfo.getAttributes();
        if (attributes != null) {
            for (AttrInfo attr : attributes) {
                String attrName = attr.getLabelName().getElabel();
                String attrType = attr.getValueType();
                Object value = attr.getValue();

                //参数为数组类型，主要用于选择字段的参数
                if ("Array[String]".equals(attrType)) {
                    JSONArray colNames = (JSONArray) value;
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
        return attrsCodeBuilder.toString() + "\n";
    }

    private String getOutPutCodeForML(AlgorithmNodeInfo nodeInfo) {
        String id = nodeInfo.getId();
        //为保存做准备，在算法里就不用再引model的库了
        return "import org.apache.spark.ml." + nodeInfo.getAlgorithmType().getElabel() + "." + nodeInfo.getLabelName().getElabel() + "Model\n" +
                "modelMap += (\"" + id + "_0\" -> (\"" + nodeInfo.getLabelName().getElabel() + "Model\" , Model)) \n";
    }

    private String getOutPutCodeForEvaluation(AlgorithmNodeInfo nodeInfo) {
        String id = nodeInfo.getId();
        return "evaluationMap += (\"" + id + "_0\" -> evaluationResult)\n";
    }

    private String getOutPutCode(AlgorithmNodeInfo nodeInfo) {
        int[] anchor = nodeInfo.getAnchor();
        int numberOfOutput = anchor[1];
        StringBuilder outputCode = new StringBuilder();
        String id = nodeInfo.getId();
        for (int i = 0; i < numberOfOutput; i++) {
            outputCode.append("\ndfMap += (\"" + id + "_" + i + "\" -> output" + (i == 0 ? "" : ("_" + i)) + " )\n\n");
        }
        return outputCode.toString() + "\n";
    }

    private String generateCode(AlgorithmNodeInfo nodeInfo, List<NodeInfo> flowInfo) {

        String inputCode = "";
        if ("prediction".equals(nodeInfo.getGroupName().getElabel())) {
            String modelType = "";
            for (NodeInfo anotherNode : flowInfo) {
                if ((anotherNode.getId() + "_0").equals(nodeInfo.getSourceIdList()[0])) {
                    modelType = anotherNode.getLabelName().getElabel();
                }
            }
            inputCode = getInputCodeForPrediction(nodeInfo, modelType);
        } else {
            inputCode = getInputCode(nodeInfo);
        }

        String innerCode = getInnerCode(nodeInfo);
        String attrsCode = getAttrsCode(nodeInfo);
        String outputCode;
        if ("machinelearning".equals(nodeInfo.getGroupName().getElabel())) {
            outputCode = getOutPutCodeForML(nodeInfo);
        } else if ("evaluation".equals(nodeInfo.getGroupName().getElabel())) {
            outputCode = getOutPutCodeForEvaluation(nodeInfo);
        } else {
            outputCode = getOutPutCode(nodeInfo);
        }
        return inputCode + attrsCode + innerCode + outputCode;
    }

    public List<ExecutionInfo> executeFlow(JSONArray flowInfo, LivySessionInfo livySessionInfo, String userId) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        codeToRun.append("var dfMap: Map[String, org.apache.spark.sql.DataFrame] = Map() \n");
        codeToRun.append("var evaluationMap: Map[String, String] = Map()\n");
        codeToRun.append("var modelMap: Map[String, (String, Any)] = Map() \n");
        List<NodeInfo> flow = new ArrayList<>();
        for (Object nodeInfo : flowInfo) {
            JSONObject node = (JSONObject) nodeInfo;
            JSONObject groupName = (JSONObject) node.get("groupName");
            String type = groupName.get("elabel").toString();
            NodeInfo curNode;
            String nodeCode;

            flow.add(JSON.toJavaObject(node, NodeInfo.class));
            if ("datasource".equals(type)) {
                curNode = JSON.toJavaObject(node, DataSourceNodeInfo.class);
                nodeCode = generateDataSourceCode((DataSourceNodeInfo) curNode, userId);
            } else if ("savedModel".equals(type)) {
                curNode = JSON.toJavaObject(node, SavedModelNodeInfo.class);
                nodeCode = generateSavedModelCode((SavedModelNodeInfo) curNode, userId);
            } else {
                curNode = JSON.toJavaObject(node, AlgorithmNodeInfo.class);
                nodeCode = generateCode((AlgorithmNodeInfo) curNode, flow);
            }

            codeToRun.append(nodeCode);

            //提交代码，得到一个url，用于前端轮询以查询这次job运行状态
            String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(), userId);
            System.out.println("success!\n" + resultUrl);

            //清空原先的代码，准备下一次提交
            codeToRun = new StringBuilder();
            ExecutionInfo executionInfo = new ExecutionInfo(curNode.getId(), resultUrl);
            executionInfoList.add(executionInfo);
        }
        String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(), userId);
        System.out.println("success!\n" + resultUrl);
        return executionInfoList;
    }

//
//    /**
//     * 用于压力测试
//     * 将所有语句放在一起执行
//     *
//     * @param flowInfo
//     * @param livySessionInfo
//     * @return
//     */
//    public List<ExecutionInfo> executeFlowForTest(List<NodeInfo> flowInfo, LivySessionInfo livySessionInfo, String userId) {
//        List<ExecutionInfo> executionInfoList = new ArrayList<>();
//        StringBuilder codeToRun = new StringBuilder();
//        codeToRun.append("var dfMap: Map[String, org.apache.spark.sql.DataFrame] = Map() \n");
//        String modelType = null;
//        for (NodeInfo nodeInfo : flowInfo) {
//
//            if (("machinelearning").equals(nodeInfo.getGroupName().getElabel())) {
//                modelType = nodeInfo.getLabelName().getElabel();
//            }
//
//            String nodeCode = generateCode(nodeInfo, userId, modelType);
//            codeToRun.append(nodeCode);
//        }
//        String resultUrl = livyService.postCode(livySessionInfo, codeToRun.toString(), userId);
//        System.out.println("success!\n" + resultUrl);
//        return executionInfoList;
//    }

}
