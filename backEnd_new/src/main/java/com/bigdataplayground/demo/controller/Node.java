package com.bigdataplayground.demo.controller;

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

    @Override
    public boolean equals(Object obj) {
        if(obj == this){
            return true;
        }
        if (obj instanceof Node) {
            Node other = (Node)obj;
            if (other.getLabel().equals(other.getLabel())&& other.getId().equals(this.getId())){
            }else {
                return false;
            }
            for(int i = 0 ;i<this.getSourceId().size();i++){
                if(this.getSourceId().get(i).equals(other.getSourceId().get(i))){
                    continue;
                }
            }
            if(other.getAttribute().equals(this.getAttribute()) && other.getLabelArray().equals(this.getLabelArray())){
                return true;
            }
        }
        return false;
    }
}

