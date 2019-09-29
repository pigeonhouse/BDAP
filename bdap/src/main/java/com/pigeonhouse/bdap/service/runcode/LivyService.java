package com.pigeonhouse.bdap.service.runcode;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.entity.execution.LivySessionDescription;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.filesystem.HdfsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

/**
 * @Author: HouWeiYing
 * @Date: 2019/9/7 11:33
 */
@Service("LivyService")
public class LivyService {
    private Logger logger = LoggerFactory.getLogger(HdfsService.class);
    private static ObjectMapper objectMapper = new ObjectMapper();

    @Value("${livyAddr}")
    String livyAddr;
    @Value("${livyNewSessionJars}")
    String livyNewSessionJars;
    @Value("${livyNewSessionKind}")
    String livyNewSessionKind;
    @Value("${numExecutors}")
    int numExecutors;
    @Value("${executorCores}")
    int executorCores;
    @Value("${spark.shuffle.reduceLocality.enabled}")
    boolean sparkShuffleReduceLocalityEnabled;
    @Value("${spark.shuffle.blockTransferService}")
    String sparkShuffleBlockTransferService;
    @Value("${spark.scheduler.minRegisteredResourcesRatio}")
    double sparkSchedulerMinRegisteredResourcesRatio;
    @Value("${spark.speculation}")
    boolean sparkSpeculation;
    @Value("http://" + "${livyAddr}" + "/sessions")
    String livySessionsUrl;

    /**
     * 提交.scala至livy
     *
     * @param code
     * @return
     */
    public String postCode(String code) {
        LivySessionInfo availableSession = selectAvailableSession();
        int sessionId = availableSession.getId();
        Map<String, String> map = new HashMap<>(2);
        map.put("code", code);
        map.put("kind", livyNewSessionKind);
        System.out.println(map);
        String jsonData = null;
        try {
            jsonData = objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String availableSessionUrl = livySessionsUrl + "/" + sessionId;
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

    /**
     * 选择空闲Session，否则创建一个
     *
     * @return
     */
    public LivySessionInfo selectAvailableSession() {
        LivySessionDescription livySessionDescription = getSessionList();
        LivySessionInfo availableSession = new LivySessionInfo();
        for (LivySessionInfo sessionInfo : livySessionDescription.getSessions()) {
            if ("idle".equals(sessionInfo.getState())) {
                availableSession = sessionInfo;
                break;
            }
            availableSession = null;
        }
        if (livySessionDescription.getTotal() == 0 || availableSession == null) {
            logger.info("No idle session is available. Waiting to create a new Livy Session");
            LivySessionInfo newSession = createSession();
            while (!"idle".equals(getSession(newSession.getId()).getState())) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            logger.info("Create A New Session." + "ID :" + newSession.getId());
            availableSession = newSession;
        }
        return availableSession;
    }

    /**
     * 获取某个Session信息（用来获取state）
     *
     * @param id
     * @return
     * @throws IOException
     */
    public LivySessionInfo getSession(int id) {
        String sessionUrl = livySessionsUrl + "/" + id;
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(sessionUrl, String.class);
        LivySessionInfo livySessionInfo = null;
        try {
            livySessionInfo = objectMapper.readValue(res, LivySessionInfo.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return livySessionInfo;
    }

    /**
     * 获取 所有Session
     *
     * @return
     */
    public LivySessionDescription getSessionList() {
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(livySessionsUrl, String.class);
        LivySessionDescription livySessionDescription = null;
        try {
            livySessionDescription = objectMapper.readValue(res, LivySessionDescription.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return livySessionDescription;
    }

    public LivySessionInfo createSession() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // body2json
        Map<String, Object> bodyHashMap = new HashMap<>();
        Map<String, Object> confHashMap = new HashMap<>();
        bodyHashMap.put("kind", livyNewSessionKind);
        List<String> jarsList = Arrays.asList(livyNewSessionJars.split(","));
        bodyHashMap.put("jars", jarsList);
        bodyHashMap.put("numExecutors", numExecutors);
        bodyHashMap.put("executorCores", executorCores);
        confHashMap.put("spark.shuffle.reduceLocality.enabled", sparkShuffleReduceLocalityEnabled);
        confHashMap.put("spark.shuffle.blockTransferService", sparkShuffleBlockTransferService);
        confHashMap.put("spark.scheduler.minRegisteredResourcesRatio", sparkSchedulerMinRegisteredResourcesRatio);
        confHashMap.put("spark.speculation", sparkSpeculation);
        bodyHashMap.put("conf", confHashMap);
        String jsonBody = null;
        try {
            jsonBody = objectMapper.writeValueAsString(bodyHashMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        // restTemplate
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, headers);
        System.out.println(httpEntity);
        ResponseEntity<String> res =
                restTemplate.exchange(livySessionsUrl, HttpMethod.POST, httpEntity, String.class);
        LivySessionInfo livySessionInfo = null;
        try {
            livySessionInfo = objectMapper.readValue(res.getBody(), LivySessionInfo.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return livySessionInfo;
    }
}
