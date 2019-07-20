package com.bigdataplayground.demo.molules.spark.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AddressConfig {
    private String appAddr;
    private String livyAddr;
    private String hdfsAddr;

    AddressConfig(){
        appAddr = "10.122.217.207:5000"; //后端所在地址（本机地址)
        livyAddr = "10.105.222.90:8998"; //livy 服务器+端口
        hdfsAddr = "10.105.222.90:9000"; //HDFS namenode
    }

    public String getAppAddr() {
        return appAddr;
    }

    public void setAppAddr(String appAddr) {
        this.appAddr = appAddr;
    }

    public String getLivyAddr() {
        return livyAddr;
    }

    public void setLivyAddr(String livyAddr) {
        this.livyAddr = livyAddr;
    }

    public String getHdfsAddr() {
        return hdfsAddr;
    }

    public void setHdfsAddr(String hdfsAddr) {
        this.hdfsAddr = hdfsAddr;
    }
}
