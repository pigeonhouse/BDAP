package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution {

    @Autowired
    LivyService livyService;
    @Autowired
    RandomIdService randomIdService;
    @Autowired
    SparkCodeService sparkCodeService;
    @Autowired
    JoinCodeService joinCodeService;
    public String executeCode(String code) {
        System.out.println(code);
        String resultUrl = livyService.postCode(code);
        return resultUrl;
    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
        String appendSaving ="";
        //"output.write.parquet(\"/user/student/" + jobId + ".parquet\")";
    }

    /**
     * 执行所有节点
     * 初始化代码
     * for 节点：节点集
     *   从数据库拿出代码填入参数
     *   代码拼接
     * 传参需要上下节点的信息
     * @param flowInfo
     * @return
     */
    public List<ExecutionInfo> executeFlow(List<NodeInfo> flowInfo) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        String codeToRun = "";
        for (NodeInfo nodeInfo : flowInfo) {
            nodeInfo.setCode(joinCodeService.transParam(nodeInfo.getCodeId(),nodeInfo.getAttributes()));

            codeToRun =codeToRun + nodeInfo.getCode() + "\n";

            if (nodeInfo.getIsCheckPoint()) {
                String jobId = randomIdService.getId();
                //saveCheckPoint(codeToRun, jobId);
                String resultUrl = executeCode(codeToRun);
                codeToRun = "";
                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getIndex(),jobId,resultUrl);
                executionInfoList.add(executionInfo);
            }
        }

        return executionInfoList;
    }
}
