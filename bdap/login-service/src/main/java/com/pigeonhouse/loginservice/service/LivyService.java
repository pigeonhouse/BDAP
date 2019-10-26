package com.pigeonhouse.loginservice.service;

import com.pigeonhouse.loginservice.entity.LivySessionInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 22:49
 */
@FeignClient("livy-service")
public interface LivyService {
    @GetMapping("/sessions")
    LivySessionInfo newSession();
}
