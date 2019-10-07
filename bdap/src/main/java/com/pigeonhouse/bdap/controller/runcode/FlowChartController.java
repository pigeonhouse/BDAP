package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.SparkExecution;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.PostCodeStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 12:54
 */

@RestController
public class FlowChartController {

    @Autowired
    SparkExecution sparkExecution;
    @Autowired
    TokenService tokenService;
    @Autowired
    LivyDao livyDao;

    @PostMapping(value = "/flow/run")
    public Response run(@RequestBody MapInfo mapInfo, HttpServletRequest request) {

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

        ArrayList<NodeInfo> nodes = mapInfo.getNodes();

        // 强制保存最后一个节点
        nodes.get(nodes.size() - 1).setIsCheckPoint(true);
        return new Response(PostCodeStatus.SUCCESS, sparkExecution.executeFlow(nodes, newSessionInfo));
    }

    @PostMapping("/flow/node/status")
    Object checkRunningStatus(String resultUrl) {
        ObjectMapper objectMapper = new ObjectMapper();
        RestTemplate restTemplate = new RestTemplate();
        String state = "";
        try {
            Map resultMap = objectMapper.readValue(
                    restTemplate.getForObject(resultUrl, String.class), Map.class);
            state = resultMap.get("state").toString();

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            System.out.println(RunningStatus.FAIL);
            return new Response(RunningStatus.FAIL, null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", state);

        System.out.println(state);
        return new Response(RunningStatus.SUCCESS, jsonObject);
    }
}
