package com.ex.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ex.demo.util.*;

public class Node {
    private String id;
    private String label;
    private List<NodeSourceId> sourceId;
    private Map<String,String> attribute;
    private Map<String,List<String>> labelArray;
    @JsonIgnore
    private ObjectMapper objectMapper = new ObjectMapper();


    public String matchFunction(String code){
        String data = new String();
        switch (label){
            case "Fillna": data = String.format(
                    code,id, sourceId.get(0).getSource(),
                    ToolSet.listToString(labelArray.get("public")),
                    attribute.get("type")
            ); break;
            default: break;
        }
        return data;
    }
    public void excuteNode() throws IOException {
        Path path = Paths.get("src/main/scala/Closed_/" + label + ".scala");
        String code = ToolSet.openFile(path);
        String data = matchFunction(code);

        Map<String,String> map = new HashMap<>();
        map.put("code",data);
        map.put("kind","spark");
        String jsonData = objectMapper.writeValueAsString(map);

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

