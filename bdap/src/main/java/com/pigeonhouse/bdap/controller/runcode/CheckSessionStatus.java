package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.LivyService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.SessionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/30 14:54
 */
@RestController
public class CheckSessionStatus {

    @Autowired
    LivyService livyService;

    @Autowired
    TokenService tokenService;

    @RequestMapping("/session/status")
    public Response sessionStatus(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String livyAddr = tokenService.getFromToken(token, "livyAddr").asString();
        int sessionId = tokenService.getFromToken(token, "sessionId").asInt();
        LivySessionInfo sessionInfo = livyService.getSessionStatus(livyAddr, sessionId);
        if ("idle".equals(sessionInfo.getState())) {
            return new Response(SessionStatus.IDLE, sessionInfo);
        } else if ("starting".equals(sessionInfo.getState())) {
            return new Response(SessionStatus.STARTING, sessionInfo);
        } else if ("busy".equals(sessionInfo.getState())) {
            return new Response(SessionStatus.BUSY, sessionInfo);
        }
        return new Response(SessionStatus.DEAD, sessionInfo);


    }
}
