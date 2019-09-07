package com.pigeonhouse.bdap.entity;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/6 18:29
 */
public class NodeInfo {
    private Integer id;
    private String code;
    private Boolean isCheckPoint;

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

    public Boolean getCheckPoint() {
        return isCheckPoint;
    }

    public void setCheckPoint(Boolean checkPoint) {
        isCheckPoint = checkPoint;
    }
}
