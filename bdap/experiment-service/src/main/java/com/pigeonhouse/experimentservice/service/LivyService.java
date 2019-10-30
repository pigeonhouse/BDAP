package com.pigeonhouse.experimentservice.service;

import com.pigeonhouse.experimentservice.entity.FileAttr.HeaderAttribute;
import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
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
    String postCode(@RequestBody LivySessionInfo livySessionInfo, @RequestParam("code") String code);

    @GetMapping("/output/schema")
    List<HeaderAttribute> getSchema(@RequestBody LivySessionInfo livySessionInfo);
    @GetMapping("/output/csv")
    String getCsv(@RequestBody LivySessionInfo livySessionInfo, @RequestParam("numOfRowsToShow") int numOfRowsToShow);
}
