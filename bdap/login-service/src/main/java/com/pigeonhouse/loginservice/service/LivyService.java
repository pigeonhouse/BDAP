package com.pigeonhouse.loginservice.service;

import com.pigeonhouse.loginservice.entity.LivySessionInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("livy-service")
public interface LivyService {
    @GetMapping("/session")
    LivySessionInfo newSession();
    @PostMapping("/session/status")
    String sessionStatus(@RequestBody LivySessionInfo livySessionInfo);
    @PostMapping("/session/code")
    String postCode(@RequestBody LivySessionInfo livySessionInfo,@RequestParam("code")String code);

}
