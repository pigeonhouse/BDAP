package com.pigeonhouse.livyservice.service;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;


@Service
public class SessionService {
    @Value("${livyNewSessionJars}")
    String livyNewSessionJars;
    @Value("${livyNewSessionKind}")
    String livyNewSessionKind;
    @Value("${numExecutors}")
    int numExecutors;
    @Value("${executorCores}")
    int executorCores;

    public LivySessionInfo createSession(String livyAddr) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, Object> bodyHashMap = new HashMap<>();
        Map<String, Object> confHashMap = new HashMap<>();
        bodyHashMap.put("kind", livyNewSessionKind);
        List<String> jarsList = Arrays.asList(livyNewSessionJars.split(","));
        bodyHashMap.put("jars", jarsList);
        bodyHashMap.put("numExecutors", numExecutors);
        bodyHashMap.put("executorCores", executorCores);

        bodyHashMap.put("conf", confHashMap);
        String jsonBody = null;
        try {
            jsonBody = new ObjectMapper().writeValueAsString(bodyHashMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, headers);
        System.out.println(httpEntity);
        ResponseEntity<String> res =
                restTemplate.exchange("http://" + livyAddr + "/sessions", HttpMethod.POST, httpEntity, String.class);
        LivySessionInfo livySessionInfo = new LivySessionInfo();

        try {
            JSONObject response = new ObjectMapper().readValue(res.getBody(), JSONObject.class);
            System.out.println(response);
            livySessionInfo.setState(response.get("state").toString());
            livySessionInfo.setId((int) response.get("id"));

        } catch (IOException e) {
            e.printStackTrace();
        }
        livySessionInfo.setLivyAddr(livyAddr);
        System.out.println(livySessionInfo);
        return livySessionInfo;
    }


    public String postCode(LivySessionInfo livySessionInfo,String code) {
        int sessionId = livySessionInfo.getId();
        String livyAddr = livySessionInfo.getLivyAddr();
        Map<String, String> map = new HashMap<>(2);
        map.put("code", code);
        System.out.println(map);
        String jsonData = null;
        try {
            jsonData = new ObjectMapper().writeValueAsString(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String availableSessionUrl = "http://" + livyAddr + "/sessions" + "/" + sessionId;
        System.out.println(availableSessionUrl);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonData, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> compute = restTemplate.exchange(
                availableSessionUrl + "/statements", HttpMethod.POST, httpEntity, String.class);

        String resultUrl = "http://" + livyAddr + Objects.requireNonNull(compute.getHeaders().get("location")).get(0);
        System.out.println("#resultUrl#");
        System.out.println(resultUrl);
        return resultUrl;
    }

    public LivySessionInfo refreshSessionStatus(LivySessionInfo livySessionInfo) {
        String livyAddr = livySessionInfo.getLivyAddr();
        int sessionId = livySessionInfo.getId();
        String sessionUrl = "http://" + livyAddr + "/sessions" + "/" + sessionId;
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(sessionUrl, String.class);
        LivySessionInfo newLivySessionInfo = new LivySessionInfo();
        try {
            JSONObject response = new ObjectMapper().readValue(res, JSONObject.class);
            newLivySessionInfo.setState(response.get("state").toString());
            newLivySessionInfo.setLivyAddr(livyAddr);
            newLivySessionInfo.setId((int) response.get("id"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newLivySessionInfo;
    }

}
