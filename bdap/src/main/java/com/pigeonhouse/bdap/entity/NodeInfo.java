package com.pigeonhouse.bdap.entity;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:18
 */
public class NodeInfo {
    private Integer id;
    private String code;
    private boolean isCheckPoint;

    public NodeInfo(Integer id, String code, boolean isCheckPoint) {
        this.id = id;
        this.code = code;
        this.isCheckPoint = isCheckPoint;
    }

    public boolean isCheckPoint() {
        return isCheckPoint;
    }

    public void setCheckPoint(boolean checkPoint) {
        isCheckPoint = checkPoint;
    }

    public NodeInfo() {
    }

    @Override
    public String toString() {
        return "NodeInfo{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", isCheckPoint=" + isCheckPoint +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
