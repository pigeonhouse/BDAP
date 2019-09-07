package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.NodeInfo;

import javax.xml.soap.Node;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:21
 */
public interface IExecution {

    void executeOneNode(NodeInfo nodeInfo);

    void executeAllNodes();
}
