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
        System.out.println(flowInfo);
        sparkExecution.executeAllNodes(flowInfo);
    }
}
