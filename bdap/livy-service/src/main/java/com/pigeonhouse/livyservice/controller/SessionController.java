package com.pigeonhouse.livyservice.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import com.pigeonhouse.livyservice.service.ServerService;
import com.pigeonhouse.livyservice.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class SessionController {

    @Autowired
    DiscoveryClient discoveryClient;
    @Autowired
    ServerService serverService;
    @Autowired
    SessionService sessionService;


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
    public String postCode(@RequestBody LivySessionInfo livySessionInfo,@RequestParam("code")String code) {
        return sessionService.postCode(livySessionInfo,code);
    }


}
