package com.pigeonhouse.filesystemservice.service;

import com.pigeonhouse.filesystemservice.entity.HeaderAttribute;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient("livy-service")
public interface LivyService {
    @GetMapping("/session")
    LivySessionInfo newSession();
    @PostMapping("/session/status")
    String sessionStatus(@RequestBody LivySessionInfo livySessionInfo);
    @PostMapping("/session/code")
    String postCode(@RequestBody LivySessionInfo livySessionInfo,@RequestParam("code")String code,@RequestParam("userId")String userId);

    @PostMapping("/output/schema")
    List<HeaderAttribute> getSchema(@RequestBody LivySessionInfo livySessionInfo);
    @PostMapping("/output/csv")
    String getCsv(@RequestBody LivySessionInfo livySessionInfo, @RequestParam("numOfRowsToShow")int numOfRowsToShow);
}
