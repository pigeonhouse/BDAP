package com.bigdataplayground.demo.MolulesSpark;

import java.util.List;
import java.util.Map;

public class Node {
    private String id;
    private String label;
    private List<NodeSourceId> sourceId;
    private Map<String,String> attribute;
    private Map<String,List<String>> labelArray;


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

