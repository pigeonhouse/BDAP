package com.pigeonhouse.livyservice.controller;

import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import com.pigeonhouse.livyservice.service.ServerService;
import com.pigeonhouse.livyservice.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 20:55
 */
@RestController
public class SessionController {

    @Autowired
    DiscoveryClient discoveryClient;

    @Autowired
    ServerService serverService;
    @Autowired
    SessionService sessionService;

    @GetMapping("/sessions")
    public ResponseEntity<LivySessionInfo> newSession(){
        String livyAddr = serverService.selectLivyServer();
        return ResponseEntity.ok(sessionService.createSession(livyAddr));
    }

}
