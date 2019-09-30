package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.service.filesystem.SparkCodeService;
import com.pigeonhouse.bdap.service.runcode.RandomIdService;
import com.pigeonhouse.bdap.service.runcode.SparkExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: XueXiaoYue HouWeiying
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
    public Object postcode(@RequestBody List<NodeInfo> flowInfo) {

        //从token中读取
        LivySessionInfo livySessionInfo = new LivySessionInfo();

        System.out.println(flowInfo);
        // 强制保存最后一个节点
        flowInfo.get(flowInfo.size() - 1).setIsCheckPoint(true);
        return sparkExecution.executeFlow(flowInfo, livySessionInfo);
    }
}
