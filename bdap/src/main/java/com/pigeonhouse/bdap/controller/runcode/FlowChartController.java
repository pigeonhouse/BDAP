package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.ExecutionService;
import com.pigeonhouse.bdap.service.runcode.QueryService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.PostCodeStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

/**
 * 可视化相关API
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 12:54
 */

@RestController
public class FlowChartController {

    @Autowired
    ExecutionService executionService;
    @Autowired
    TokenService tokenService;
    @Autowired
    LivyDao livyDao;
    @Autowired
    ResponseService responseService;
    @Autowired
    QueryService queryService;

    @PassToken
    @PostMapping(value = "/flow/run")
    public Response run(@RequestBody MapInfo mapInfo, HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo sessionInfo = tokenService.getLivySessionInfoFromToken(token);
        LivySessionInfo newSessionInfo;
        try {
            newSessionInfo = livyDao.refreshSessionStatus(sessionInfo);
        } catch (Exception e) {
            return responseService.response(PostCodeStatus.NOT_EXIST, null, request);
        }
        if (!"idle".equals(newSessionInfo.getState())) {
            return responseService.response(PostCodeStatus.SESSION_BUSY, null, request);
        }

        ArrayList<NodeInfo> nodes = mapInfo.getNodes();

        return responseService.response(PostCodeStatus.SUCCESS, executionService.executeFlow(nodes, newSessionInfo), request);
    }

    @PostMapping("/flow/node/status")
    public Response checkRunningStatus(@RequestBody JSONObject resultUrlJson, HttpServletRequest request) {
        ObjectMapper objectMapper = new ObjectMapper();
        RestTemplate restTemplate = new RestTemplate();
        String resultUrl = resultUrlJson.getString("resultUrl");

        String state = "";
        try {
            Map resultMap = objectMapper.readValue(
                    restTemplate.getForObject(resultUrl, String.class), Map.class);
            state = resultMap.get("state").toString();

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            System.out.println(RunningStatus.FAIL);
            return responseService.response(RunningStatus.FAIL, null, request);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", state);

        System.out.println(state);
        return responseService.response(RunningStatus.SUCCESS, jsonObject, request);
    }

    @GetMapping("/flow/node/data/{nodeId}")
    public Response showNodeResult(@PathVariable String nodeId, HttpServletRequest request) {
        try {
            String token = tokenService.getTokenFromRequest(request, "loginToken");
            LivySessionInfo sessionInfo = tokenService.getLivySessionInfoFromToken(token);
            String resultUrl = livyDao.postCode("dfMap(\"" + nodeId + "\").show()", sessionInfo);
            String result = queryService.getOutput(resultUrl);
            return responseService.response(RunningStatus.SUCCESS, result, request);
        } catch (Exception e) {
            return responseService.response(RunningStatus.FAIL, null, request);
        }
    }


    /**
     * 用于进行压力测试
     *
     * @param mapInfo
     * @return
     */
    @PassToken
    @PostMapping(value = "/flow/run/test")
    public Response runForTest(@RequestBody MapInfo mapInfo) {

        LivySessionInfo newSessionInfo = new LivySessionInfo();
        try {
            newSessionInfo = livyDao.selectAvailableSessionFromFour();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ArrayList<NodeInfo> nodes = mapInfo.getNodes();

        return responseService.response(PostCodeStatus.SUCCESS, executionService.executeFlowForTest(nodes, newSessionInfo), null);
    }
}
