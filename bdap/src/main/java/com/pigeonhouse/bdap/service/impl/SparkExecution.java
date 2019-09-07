package com.pigeonhouse.bdap.service.impl;

import com.pigeonhouse.bdap.entity.NodeInfo;
import com.pigeonhouse.bdap.service.IExecution;
import com.pigeonhouse.bdap.service.LivyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution implements IExecution {

    @Autowired
    LivyService livyService;

    @Override
    public void executeOneNode(NodeInfo nodeInfo) {
        try {
            livyService.postCode(nodeInfo.getCode());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void executeAllNodes(List<NodeInfo> flowInfo) {
        for (NodeInfo nodeInfo : flowInfo) {
            executeOneNode(nodeInfo);
        }
    }
}
