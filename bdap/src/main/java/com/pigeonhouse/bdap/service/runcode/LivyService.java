package com.pigeonhouse.bdap.service.runcode;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.filesystem.HdfsService;
import org.apache.livy.LivyClient;
import org.apache.livy.LivyClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * @Author: HouWeiying
 * @Date: 2019/9/7 11:33
 */
@Service("LivyService")
public class LivyService {
    private Logger logger = LoggerFactory.getLogger(HdfsService.class);
    private static ObjectMapper objectMapper = new ObjectMapper();


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


    /**
     * 根据数据库中记录的livy服务器负载情况
     * 选择一个负载最低的livy服务器
     *
     * @return 返回该服务器地址及端口
     */
    public String selectLivyServer() {
        //待完成
        return "10.105.222.90:8998";
    }


    /**
     * 提交.scala至livy
     *
     * @param code
     * @return
     */
    public String postCode(String code, LivySessionInfo livySessionInfo) {
        //LivySessionInfo availableSession = selectAvailableSession();
        int sessionId = livySessionInfo.getId();
        String livyAddr = livySessionInfo.getLivyAddr();
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

    public void buildClient(String livyAddr) {
        //编程API（未完成）
        try {
            LivyClient livyClient = new LivyClientBuilder().setURI(new URI(livyAddr)).build();
        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
        }


    }
//    /**
//     * 选择空闲Session，否则创建一个
//     *
//     * @return
//     */
//    public LivySessionInfo selectAvailableSession() {
//        LivySessionDescription livySessionDescription = getSessionList();
//        LivySessionInfo availableSession = new LivySessionInfo();
//        for (LivySessionInfo sessionInfo : livySessionDescription.getSessions()) {
//            if ("idle".equals(sessionInfo.getState())) {
//                availableSession = sessionInfo;
//                break;
//            }
//            availableSession = null;
//        }
//        if (livySessionDescription.getTotal() == 0 || availableSession == null) {
//            logger.info("No idle session is available. Waiting to create a new Livy Session");
//            LivySessionInfo newSession = createSession();
//            while (!"idle".equals(getSession(newSession.getId()).getState())) {
//                try {
//                    Thread.sleep(1000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//            }
//            logger.info("Create A New Session." + "ID :" + newSession.getId());
//            availableSession = newSession;
//        }
//        return availableSession;
//    }


//    /**
//     * 获取 所有Session
//     *
//     * @return
//     */
//    public LivySessionDescription getSessionList() {
//        RestTemplate restTemplate = new RestTemplate();
//        String res = restTemplate.getForObject(livySessionsUrl, String.class);
//        LivySessionDescription livySessionDescription = null;
//        try {
//            livySessionDescription = objectMapper.readValue(res, LivySessionDescription.class);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return livySessionDescription;
//    }


    public void deleteSession(String id) {
//        String livyAddr = livySessionInfo.getLivyAddr();
//        int sessionId = livySessionInfo.getId();
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete("http://" + "10.105.222.90:8998" + "/sessions" + "/" + id);
        return;
    }

    /**
     * 获取某个Session信息（用来获取state）
     *
     * @param
     * @return
     * @throws IOException
     */
    public LivySessionInfo refreshSession(LivySessionInfo livySessionInfo) {
        String livyAddr = livySessionInfo.getLivyAddr();
        String sessionUrl = "http://" + livyAddr + "/sessions" + "/" + livySessionInfo.getId();
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(sessionUrl, String.class);
        LivySessionInfo newlivySessionInfo = new LivySessionInfo();
        try {
            newlivySessionInfo = objectMapper.readValue(res, LivySessionInfo.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newlivySessionInfo;
    }


    public LivySessionInfo createSession(String livyAddr) {
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
                restTemplate.exchange("http://" + livyAddr + "/sessions", HttpMethod.POST, httpEntity, String.class);
        LivySessionInfo livySessionInfo = new LivySessionInfo();


        try {
            livySessionInfo = objectMapper.readValue(res.getBody(), LivySessionInfo.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        livySessionInfo.setLivyAddr(livyAddr);

        while (!"idle".equals(refreshSession(livySessionInfo).getState())) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return livySessionInfo;
    }
}
