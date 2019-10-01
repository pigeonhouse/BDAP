package com.pigeonhouse.bdap.service.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution {

    @Autowired
    LivyDao livyDao;
    @Autowired
    SparkCodeDao sparkCodeDao;

    /**
     * 给代码传入参数
     *
     * @param codeId     Spark代码编号
     * @param attributes 传入参数
     * @return 完整spark代码
     */
    public String injectParameters(String codeId, Map<String, String> attributes) {
        StringBuilder parameterStatements = new StringBuilder();
        return parameterStatements.toString();
    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
//        String pre = nodeInfo.getCode();
//        String appendSaving = "output.write.parquet(\"" + jobId + ".parquet\")";
//        nodeInfo.setCode(pre + appendSaving + "\n");
    }

    /**
     * 执行所有节点
     * 初始化代码
     * for 节点：节点集
     * 从数据库拿出代码填入参数
     * 代码拼接
     * 传参需要上下节点的信息
     *
     * @param flowInfo
     * @return
     */
    public List<ExecutionInfo> executeFlow(List<NodeInfo> flowInfo, LivySessionInfo livySessionInfo) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        for (NodeInfo nodeInfo : flowInfo) {

            //根据codeId在数据库中找到源码
            codeToRun.append(sparkCodeDao.findByCodeId(nodeInfo.getCodeId())).append("\n");

            //由于最后一个结点强制设为了checkpoint 所以不需要额外检查
            if (nodeInfo.getIsCheckPoint()) {
                UUID uuid = UUID.randomUUID();
                String jobId = uuid.toString().replace("-", "");


                String resultUrl = livyDao.postCode(codeToRun.toString(),livySessionInfo);
                codeToRun = new StringBuilder();
                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getIndex(), jobId, resultUrl);
                executionInfoList.add(executionInfo);
            }
        }
        return executionInfoList;
    }

}
