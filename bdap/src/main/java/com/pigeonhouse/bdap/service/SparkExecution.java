package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution {

    @Autowired
    LivyService livyService;
    @Autowired
    RandomIdService randomIdService;

    public String executeOneNode(NodeInfo nodeInfo) {
        System.out.println(nodeInfo);
        String resultUrl = "";
        try {
            resultUrl = livyService.postCode(nodeInfo.getCode());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultUrl;

    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
        String pre = nodeInfo.getCode();
        String appendSaving = "output.write.parquet(\"" + jobId + ".parquet\")";
        nodeInfo.setCode(pre + appendSaving + "\n");
    }

    public List<ExecutionInfo> executeAllNodes(List<NodeInfo> flowInfo) {
        List<ExecutionInfo> resultList = new ArrayList<>();

        NodeInfo tempNode = new NodeInfo(0, "", false);
        for (NodeInfo nodeInfo : flowInfo) {
            String origin = tempNode.getCode();
            tempNode.setCode(origin + nodeInfo.getCode() + "\n");
            if (nodeInfo.getIsCheckPoint()) {
                tempNode.setIndex(nodeInfo.getIndex());
                String jobId = randomIdService.getId();

                //加上存储结果的代码
                saveCheckPoint(tempNode, jobId);

                String resultUrl = executeOneNode(tempNode);

                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getIndex(), jobId, resultUrl);

                resultList.add(executionInfo);

                tempNode.setCode("");
            }
        }
        return resultList;
    }
}
