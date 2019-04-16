package com.bigdataplayground.demo.MolulesSpark;

import com.bigdataplayground.demo.MolulesSpark.util.LivyContact;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SparkExecutor {
    private String livyAddr;
    private String appAddr;


    public SparkExecutor(String livyAddr,String appAddr){
        this.appAddr = appAddr;
        this.livyAddr = livyAddr;
    }
    /**
     * 填写代码中的占位符，原本写入地址的位置现在替换为了livyaddr和appAddr，
     * @param code
     * @return
     */
    private String matchFunction(Node node, String code){
        String data =new String();
        switch (node.getLabel()){
            case "Fillna": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource(),
                    ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getAttribute().get("type"),"http://"+appAddr+"/RunningPost"
            ); break;
            case "MinMaxScaler": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource(),
                    ToolSet.listToString(node.getLabelArray().get("public")),
                    "http://"+appAddr+"/RunningPost"
            );break;
            case "hdfsFile": data = String.format(code,
                    node.getId(), node.getAttribute().get("fileName")
            );break;
            case "LogisticRegression": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("train_x")),
                    ToolSet.listToString(node.getLabelArray().get("train_y")),
                    node.getSourceId().get(0).getSource(),node.getSourceId().get(1).getSource(),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "TransformType": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getSourceId().get(0).getSource(),"number",
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "Stringindex": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getSourceId().get(0).getSource(),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "SortBy": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource(),
                    ToolSet.listToString(node.getLabelArray().get("public")),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "StandardScaler": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getSourceId().get(0).getSource(),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "QuantileDiscretizer": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getAttribute().get("新生成列名"),node.getSourceId().get(0).getSource(),
                    node.getAttribute().get("类别数"),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "OneHotEncoding": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("public")),
                    node.getSourceId().get(0).getSource(),
                    "http://"+appAddr+"/RunningPost"
            ); break;

            default: break;
        }
        return data;
    }

    public void executeNode(Node node) throws IOException {

        Path path = Paths.get("src/main/scala/Closed_/" + node.getLabel() + ".scala");
        String code = matchFunction(node,ToolSet.openFile(path));

        System.out.println(code);

        LivyContact.postCode(livyAddr,code);
    }

}
