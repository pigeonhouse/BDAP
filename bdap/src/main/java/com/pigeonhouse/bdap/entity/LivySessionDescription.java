package com.pigeonhouse.bdap.entity;

import java.io.Serializable;
import java.util.List;

public class LivySessionDescription implements Serializable {

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