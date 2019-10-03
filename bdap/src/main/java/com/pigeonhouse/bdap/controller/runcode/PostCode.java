package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.SparkExecution;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.PostCodeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
    TokenService tokenService;
    @Autowired
    LivyDao livyDao;

    @PostMapping(value = "/postcode")
    public Response postcode(@RequestBody List<NodeInfo> flowInfo, HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo sessionInfo = tokenService.getLivySessionInfoFromToken(token);
        LivySessionInfo newSessionInfo;
        try {
            newSessionInfo = livyDao.refreshSessionStatus(sessionInfo);
        } catch (Exception e) {
            return new Response(PostCodeStatus.NOT_EXIST, null);
        }
        if (!"idle".equals(newSessionInfo.getState())) {
            return new Response(PostCodeStatus.SESSION_BUSY, null);
        }

        System.out.println(flowInfo);
        // 强制保存最后一个节点
        flowInfo.get(flowInfo.size() - 1).setIsCheckPoint(true);
        return new Response(PostCodeStatus.SUCCESS, sparkExecution.executeFlow(flowInfo, newSessionInfo));
    }
}
