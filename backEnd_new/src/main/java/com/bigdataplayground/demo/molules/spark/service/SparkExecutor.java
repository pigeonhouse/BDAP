package com.bigdataplayground.demo.MolulesSpark.service;

import com.bigdataplayground.demo.MolulesSpark.domain.Node;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SparkExecutor {
    private String livyAddr;
    private String appAddr;


    public SparkExecutor(String livyAddr, String appAddr){
        this.appAddr = appAddr;
        this.livyAddr = livyAddr;
    }
    /**
     * 填写代码中的占位符，原本写入地址的位置现在替换为了appAddr
     * @param code
     * @return
     */
    private String matchFunction(Node node, String code){
        String data = "";
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
                    node.getSourceId().get(0).getSource() + " " + node.getSourceId().get(1).getSource(),
                    ToolSet.listToString(node.getLabelArray().get("predict_y")),
                    "http://"+appAddr+"/RunningPost"
            ); break;
            case "RandomForestModel": data = String.format(code,
                    node.getId(), ToolSet.listToString(node.getLabelArray().get("train_x")),
                    ToolSet.listToString(node.getLabelArray().get("train_y")),
                    node.getSourceId().get(0).getSource() + " " + node.getSourceId().get(1).getSource(),
                    ToolSet.listToString(node.getLabelArray().get("predict_y")),
                    node.getAttribute().get("NumTree"),
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
            case "DataFilter": data = String.format(code,
                    node.getId(), node.getAttribute().get("新生成列名"), node.getSourceId().get(0).getSource(),
                    node.getAttribute().get("condition"),
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
            case "Convolution": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource(),
                    node.getAttribute().get("x"), node.getAttribute().get("y"),
                    node.getAttribute().get("输出平面数量"), node.getAttribute().get("输入平面数量"),
                    node.getAttribute().get("activation")
            ); break;
            case "Reshape": data = String.format(code,
                    node.getId(), node.getAttribute().get("维度"), node.getAttribute().get("图片x像素"),
                    node.getAttribute().get("图片y像素"), node.getAttribute().get("图片z像素")
            ); break;
            case "MaxPooling": data = String.format(code,
                    node.getAttribute().get("过滤器横向大小"), node.getAttribute().get("过滤器纵向大小"),
                    node.getAttribute().get("横向步长"), node.getAttribute().get("纵向步长")
            ); break;
            case "NewNetwork": data = String.format(code,
                    node.getId()
            ); break;
            case "Linear": data = String.format(code,
                    node.getAttribute().get("输入维度"), node.getAttribute().get("输出维度"),
                    node.getAttribute().get("activation")
            ); break;
            case "InputPicture": data = String.format(code,
                    node.getId(),
                    node.getAttribute().get("训练集数据"), node.getAttribute().get("训练集标签"),
                    node.getAttribute().get("验证集数据"), node.getAttribute().get("验证集标签"),
                    node.getAttribute().get("batchSize")
            ); break;
            case "Train": data = String.format(code,
                    node.getId(), node.getAttribute().get("学习率"), node.getAttribute().get("学习率衰减"),
                    node.getAttribute().get("训练次数")
            ); break;
            case "Evaluation": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource()
            ); break;
            case "Predict": data = String.format(code,
                    node.getId(), node.getSourceId().get(0).getSource()
            ); break;
            case "NewNetwork_": data = String.format(code,
                    node.getId()
            ); break;
            case "Embedding": data = String.format(code,
                    node.getAttribute().get("输入维度"), node.getAttribute().get("输出维度"), node.getAttribute().get("input_length")
            ); break;
            case "LSTM": data = String.format(code,
                    node.getAttribute().get("输出维度"), node.getAttribute().get("Dropout")
            ); break;
            case "Dense": data = String.format(code,
                    node.getAttribute().get("输出维度"), node.getAttribute().get("activation")
            ); break;
            case "Imdb": data = String.format(code,
                    "http://"+appAddr+"/RunningPost"
            ); break;
            /*
            case "NewModule" : data = String.format(code,
                    node.getId(),
                    "http://"+appAddr+"/RunningPost"
            ); break;
             */
            default: break;
        }
        return data;
    }

    public void executeNode(Node node) throws IOException {

        Path path = Paths.get("src/main/scala/Closed_/" + node.getLabel() + ".scala");
        String code = matchFunction(node,ToolSet.openFile(path));

        System.out.println("#Code to run:#");
        System.out.println(code);

        LivyService.postCode(livyAddr,code);
    }

    public void executeAll(List<Node> nodeList) throws IOException {
        for(Node node : nodeList){
            System.out.println(node.getLabel()+" is running");
            executeNode(node);

        }

    }
}
