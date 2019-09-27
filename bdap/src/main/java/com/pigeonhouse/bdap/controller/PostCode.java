package com.pigeonhouse.bdap.controller;

import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.service.RandomIdService;
import com.pigeonhouse.bdap.service.SparkCodeService;
import com.pigeonhouse.bdap.service.SparkExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    @Autowired
    RandomIdService randomIdService;
    @Autowired
    SparkCodeService sparkCodeService;

    @PostMapping(value = "/postcode")
    Object postcode(@RequestBody List<NodeInfo> flowInfo) {
        System.out.println(flowInfo);
        // 强制保存最后一个节点
        flowInfo.get(flowInfo.size()-1).setIsCheckPoint(true);
        return sparkExecution.executeFlow(flowInfo);
    }
}
