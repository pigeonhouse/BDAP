package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;


/**
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/8 18:54
 */
@RestController
public class CheckRunningStatus {

    @PostMapping("/runningstatus")
    Object checkstatus(String resultUrl) {
        ObjectMapper objectMapper = new ObjectMapper();
        RestTemplate restTemplate = new RestTemplate();
        String state = "";
        try {
            Map resultMap = objectMapper.readValue(
                    restTemplate.getForObject(resultUrl, String.class), Map.class);
            state = resultMap.get("state").toString();

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            System.out.println(RunningStatus.FAIL_TO_QUERY);
            return new Response(RunningStatus.FAIL_TO_QUERY, null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("state", state);

        System.out.println(state);
        return new Response(RunningStatus.SUCCESSFUL_QUERY, jsonObject);
    }
}
