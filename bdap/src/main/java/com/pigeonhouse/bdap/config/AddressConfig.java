package com.pigeonhouse.bdap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:55
 */
@Component
@ConfigurationProperties(prefix = "addr")
public class AddressConfig {
    private String livyAddr;
    private String hdfsAddr;
    private String appAddr;

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

    public String getAppAddr() {
        return appAddr;
    }

    public void setAppAddr(String appAddr) {
        this.appAddr = appAddr;
    }
}
