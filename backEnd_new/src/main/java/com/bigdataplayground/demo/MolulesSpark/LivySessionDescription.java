package com.bigdataplayground.demo.MolulesSpark;

import java.io.Serializable;
import java.util.List;


public class LivySessionDescription {

    private int from;

    private int total;

    private List<LivySessionInfo> sessions;

    public int getFrom() {
        return from;
    }

    public int getTotal() {
        return total;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<LivySessionInfo> getSessions() {
        return sessions;
    }

    public void setSessions(List<LivySessionInfo> sessions) {
        this.sessions = sessions;
    }
}


class LivySessionInfo implements Serializable {

    private int id;

    private String appId;

    private String owner;

    private String proxyUser;

    private String state;

    private String kind;

    private LivySessionAppInfo appInfo;

    private List<String> log;

    public int getId() {
        return id;
    }

    public String getAppId() {
        return appId;
    }

    public String getOwner() {
        return owner;
    }

    public String getProxyUser() {
        return proxyUser;
    }

    public String getState() {
        return state;
    }

    public String getKind() {
        return kind;
    }

    public LivySessionAppInfo getAppInfo() {
        return appInfo;
    }

    public List<String> getLog() {
        return log;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setProxyUser(String proxyUser) {
        this.proxyUser = proxyUser;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public void setAppInfo(LivySessionAppInfo appInfo) {
        this.appInfo = appInfo;
    }

    public void setLog(List<String> log) {
        this.log = log;
    }
}

class LivySessionAppInfo {

    private String driverLogUrl;

    private String sparkUiUrl;

    public String getDriverLogUrl() {
        return driverLogUrl;
    }

    public String getSparkUiUrl() {
        return sparkUiUrl;
    }

    public void setDriverLogUrl(String driverLogUrl) {
        this.driverLogUrl = driverLogUrl;
    }

    public void setSparkUiUrl(String sparkUiUrl) {
        this.sparkUiUrl = sparkUiUrl;
    }
}