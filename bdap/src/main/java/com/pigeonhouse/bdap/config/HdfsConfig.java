package com.pigeonhouse.bdap.config;

import org.apache.hadoop.conf.Configuration;

/**
 * @Author: XingTianYu
 * @Date: 2019/9/24 11:30
 */
public class HdfsConfig {

    private String defaultHdfsUri = "hdfs://10.105.222.90:8020";
    private String defaultDirectory="/bdap/students";
    private Configuration conf = new org.apache.hadoop.conf.Configuration();

    public HdfsConfig() {
        conf.set("dfs.client.use.datanode.hostname", "true");
        conf.set("fs.defaultFS", defaultHdfsUri);
    }

    public Configuration getconf() {
        return this.conf;
    }

    public String getDefaultHdfsUri() {
        return this.defaultHdfsUri;
    }
    public String getDefaultDirectory() {
        return this.defaultDirectory;
    }

}
