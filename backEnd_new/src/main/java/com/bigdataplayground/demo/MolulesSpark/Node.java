package com.bigdataplayground.demo.MolulesSpark;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bigdataplayground.demo.MolulesSpark.util.*;

public class Node {
    private String id;
    private String label;
    private List<NodeSourceId> sourceId;
    private Map<String,String> attribute;
    private Map<String,List<String>> labelArray;
    @JsonIgnore
    private ObjectMapper objectMapper = new ObjectMapper();
    @JsonIgnore
    private String livyAddr = "";
    @JsonIgnore
    private String appAddr = "";


    /**
     * 填写代码中的占位符，原本写入地址的位置现在替换为了livyaddr和appAddr，
     * @param code
     * @return
     */
    private String matchFunction(String code){
        String data =new String();
        switch (label){
            case "Fillna": data = String.format(code,
                    id, sourceId.get(0).getSource(),
                    ToolSet.listToString(labelArray.get("public")),
                    attribute.get("type"),"http://"+appAddr+"/RunningPost"
            ); break;
            case "MinMaxScaler": data = String.format(code,
                    id, sourceId.get(0).getSource(),
                    ToolSet.listToString(labelArray.get("public"))
            );break;
            case "hdfsFile": data = String.format(code,
                    id, attribute.get("fileName")
            );break;
            case "LogisticRegression": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("train_x")),
                    ToolSet.listToString(labelArray.get("train_y")),
                    sourceId.get(0).getSource(),sourceId.get(1).getSource()
            ); break;
            case "TransformType": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("public")),
                    sourceId.get(0).getSource(),"number"
            ); break;
            case "Stringindex": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("public")),
                    sourceId.get(0).getSource()
            ); break;
            case "SortBy": data = String.format(code,
                    id, sourceId.get(0).getSource(),
                    ToolSet.listToString(labelArray.get("public"))
            ); break;
            case "StandardScaler": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("public")),
                    sourceId.get(0).getSource()
            ); break;
            case "QuantileDiscretizer": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("public")),
                    attribute.get("新生成列名"),sourceId.get(0).getSource(),
                    attribute.get("类别数")
            ); break;
            case "OneHotEncoding": data = String.format(code,
                    id, ToolSet.listToString(labelArray.get("public")),
                    sourceId.get(0).getSource()
            ); break;

            default: break;
        }
        return data;
    }
    public void excuteNode(String appAddr, String livyAddr) throws IOException {

        this.livyAddr = livyAddr;
        this.appAddr = appAddr;

        Path path = Paths.get("src/main/scala/Closed_/" + label + ".scala");
        String code = matchFunction(ToolSet.openFile(path));

        System.out.println(code);

        LivyContact.postCode(livyAddr,code);

        return ;
    }


    public String getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public List<NodeSourceId> getSourceId() {
        return sourceId;
    }

    public Map<String, String> getAttribute() {
        return attribute;
    }

    public Map<String, List<String>> getLabelArray() {
        return labelArray;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setSourceId(List<NodeSourceId> sourceId) {
        this.sourceId = sourceId;
    }

    public void setAttribute(Map<String, String> attribute) {
        this.attribute = attribute;
    }

    public void setLabelArray(Map<String, List<String>> labelArray) {
        this.labelArray = labelArray;
    }
}

class NodeSourceId{
    private String source;
    private int sourceAnchor;

    public String getSource() {
        return source;
    }

    public int getSourceAnchor() {
        return sourceAnchor;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setSourceAnchor(int sourceAnchor) {
        this.sourceAnchor = sourceAnchor;
    }
}

