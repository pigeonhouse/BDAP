package com.bigdataplayground.demo.MolulesSpark.domain;

public class HdfsOptRequest {
    private String kind;

    private String param;

    private String user;

    private String path;

    private String content;

    private String localPath; //upload

    public String getKind() {
        return kind;
    }

    public String getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getLocalPath() {
        return localPath;
    }

    public String getParam() {
        return param;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
