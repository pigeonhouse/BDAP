package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.SessionStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/30 14:54
 */
@RestController
public class LivySessionController {

    @Autowired
    LivyDao livyDao;

    @Autowired
    TokenService tokenService;
    @Autowired
    ResponseService responseService;


    @RequestMapping("/session/status")
    public Response sessionStatus(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);
        LivySessionInfo newSessionInfo = livyDao.refreshSessionStatus(livySessionInfo);
        if ("idle".equals(newSessionInfo.getState())) {
            return responseService.response(SessionStatus.IDLE, newSessionInfo,request);
        } else if ("starting".equals(newSessionInfo.getState())) {
            return responseService.response(SessionStatus.STARTING, newSessionInfo,request);
        } else if ("busy".equals(newSessionInfo.getState())) {
            return responseService.response(SessionStatus.BUSY, newSessionInfo,request);
        }
        return responseService.response(SessionStatus.DEAD, newSessionInfo,request);
    }

    @PassToken
    @RequestMapping("/session/delete")
    public void delete(String id) {
        livyDao.deleteSession(id);
    }

}
