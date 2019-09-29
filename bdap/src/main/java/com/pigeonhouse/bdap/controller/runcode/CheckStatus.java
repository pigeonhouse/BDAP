package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/8 18:54
 */
@RestController
public class CheckStatus {

    @PostMapping("/checkstatus")
    Object checkstatus(@RequestBody ExecutionInfo executionInfo) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        RestTemplate restTemplate = new RestTemplate();
        boolean isDone = "available".equals(objectMapper.readValue(
                restTemplate.getForObject(executionInfo.getResultUrl(), String.class), Map.class)
                .get("state"));
        JSONObject jsonObject = new JSONObject();
        if (!isDone) {
            jsonObject.put("isDone", "false");
        } else {
            jsonObject.put("isDone", "true");
        }
        return jsonObject;
    }
}
