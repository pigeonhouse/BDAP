package com.bigdataplayground.demo.molules.spark.domain;

public class NodeSourceId{
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

    @Override
    public boolean equals(Object obj) {
        if(this == obj){
            return true;
        }
        if(obj instanceof NodeSourceId){
            NodeSourceId other = (NodeSourceId) obj;
            if(this.getSource().equals(other.getSource())&&this.getSourceAnchor()==other.getSourceAnchor()){
                return true;
            }
        }
        return false;
    }
}
