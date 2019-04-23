package com.bigdataplayground.demo.MolulesSpark.domain;

import java.io.Serializable;
import java.util.List;


public class LivySessionDescription implements Serializable{

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

class LivySessionAppInfo implements Serializable {

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

