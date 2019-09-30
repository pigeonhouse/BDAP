package com.pigeonhouse.bdap.service.runcode;

import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.service.filesystem.SparkCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    @Value("${serverIp}")
    private String serverIp;

    public String executeCode(String code, LivySessionInfo livySessionInfo) {
        System.out.println(code);
        String resultUrl = livyService.postCode(code,livySessionInfo);
        return resultUrl;
    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
        String appendSaving = "";
        //"output.write.parquet(\"/user/student/" + jobId + ".parquet\")";
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
    public List<ExecutionInfo> executeFlow(List<NodeInfo> flowInfo,LivySessionInfo livySessionInfo) {
        List<ExecutionInfo> executionInfoList = new ArrayList<>();
        StringBuilder codeToRun = new StringBuilder();
        for (NodeInfo nodeInfo : flowInfo) {
            nodeInfo.setCode(joinCodeService.transParam(nodeInfo.getCodeId(), nodeInfo.getAttributes()));
//            nodeInfo.setCode(sparkCodeService.findByCodeId(nodeInfo.getCodeId()).getOriginCode());
            codeToRun.append(nodeInfo.getCode()).append("\n");
            //由于最后一个结点强制设为了checkpoint 所以不需要额外检查
            if (nodeInfo.getIsCheckPoint()) {
                String jobId = randomIdService.getId();
                //saveCheckPoint(codeToRun, jobId);
                String postStatusCode = "val result = Http(\"http://%s:8888/runningStatus\")" +
                        ".postData(\"{\\\"jobId\\\":\\\"%s\\\",\\\"codeId\\\":\\\"%s\\\"}\")" +
                        ".header(\"Content-Type\", \"application/json\").header(\"Charset\", \"UTF-8\")." +
                        "option(HttpOptions.readTimeout(10000)).asString";
                postStatusCode = String.format(postStatusCode, serverIp, jobId, nodeInfo.getCodeId());
                codeToRun.append(postStatusCode);
                String resultUrl = executeCode(codeToRun.toString(),livySessionInfo);
                codeToRun = new StringBuilder();
                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getIndex(), jobId, resultUrl);
                executionInfoList.add(executionInfo);
            }
        }
        return executionInfoList;
    }
}
