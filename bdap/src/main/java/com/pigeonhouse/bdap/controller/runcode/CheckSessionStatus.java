package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.TokenService;
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
    LivyDao livyDao;

    @Autowired
    TokenService tokenService;

    @RequestMapping("/session/status")
    public Response sessionStatus(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);
        LivySessionInfo newSessionInfo = livyDao.refreshSessionStatus(livySessionInfo);
        if ("idle".equals(newSessionInfo.getState())) {
            return new Response(SessionStatus.IDLE, newSessionInfo);
        } else if ("starting".equals(newSessionInfo.getState())) {
            return new Response(SessionStatus.STARTING, newSessionInfo);
        } else if ("busy".equals(newSessionInfo.getState())) {
            return new Response(SessionStatus.BUSY, newSessionInfo);
        }
        return new Response(SessionStatus.DEAD, newSessionInfo);


    }
}
