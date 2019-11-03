package com.pigeonhouse.livyservice.controller;

import com.pigeonhouse.livyservice.dao.TokenDao;
import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import com.pigeonhouse.livyservice.service.ServerService;
import com.pigeonhouse.livyservice.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.*;


@RestController
public class SessionController {

    @Autowired
    DiscoveryClient discoveryClient;
    @Autowired
    ServerService serverService;
    @Autowired
    SessionService sessionService;
    @Autowired
    TokenDao tokenDao;

    @GetMapping("/session")
    public LivySessionInfo newSession() {
        String livyAddr = serverService.selectLivyServer();
        return sessionService.createSession(livyAddr);
    }

    @PostMapping("/session/status")
    public String sessionStatus(@RequestBody LivySessionInfo livySessionInfo) {
        LivySessionInfo newSessionInfo = sessionService.refreshSessionStatus(livySessionInfo);
        return newSessionInfo.getState();
    }

    @PostMapping("/session/code")
    public String postCode(@RequestBody LivySessionInfo livySessionInfo,
                           @RequestParam("code")String code,
                           @RequestParam("userId")String userId) {
        tokenDao.updateRefreshToken(userId);
        return sessionService.postCode(livySessionInfo,code);
    }
}
