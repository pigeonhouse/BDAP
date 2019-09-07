package com.pigeonhouse.bdap.controller;

import com.pigeonhouse.bdap.entity.NodeInfo;
import com.pigeonhouse.bdap.service.impl.SparkExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 12:54
 */
@RestController
public class PostCode {

    @Autowired
    SparkExecution sparkExecution;

    @RequestMapping(value = "/code", method = RequestMethod.POST)
    void test(@RequestBody List<NodeInfo> flowInfo) {
        System.out.println("entered");
//        String s = "val data = spark.read.format(\"csv\").option(\"header\",\"true\").option(\"multiLine\", true).load(\"hdfs:///bdap/demoData/simpleTest.csv\")";
////        sparkExecution.executeOneNode(s);
        System.out.println(flowInfo);
        for (NodeInfo nodeInfo : flowInfo) {
            sparkExecution.executeOneNode(nodeInfo);
        }
    }
}
