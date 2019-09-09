package com.pigeonhouse.bdap.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.entity.LivySessionDescription;
import com.pigeonhouse.bdap.entity.LivySessionInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: HouWeiYing
 * @Date: 2019/9/7 11:33
 */

@Service
public class LivyService {

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Value("${sessionId}")
    int sessionId;

    @Value("${livyAddr}")
    String livyAddr;

    /**
     * 提交.scala至livy
     *
     * @param code
     * @return
     * @throws IOException
     */
    public String postCode(String code) throws IOException {

        //LivySessionInfo availableSession = selectAvailableSession();

        System.out.println(livyAddr);

        Map<String, String> map = new HashMap<>();
        map.put("code", code);
        map.put("kind", "spark");
        String jsonData = objectMapper.writeValueAsString(map);

        String availableSessionUrl = "http://" + livyAddr + "/sessions/" + sessionId;

        System.out.println(availableSessionUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonData, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> compute = restTemplate.exchange(
                availableSessionUrl + "/statements",
                HttpMethod.POST, httpEntity, String.class
        );

        String resultUrl = "http://" + livyAddr + compute.getHeaders().get("location").get(0);

        System.out.println("#resultUrl#");
        System.out.println(resultUrl);

        return resultUrl;

    }

    /**
     * 选择空闲Session，否则创建一个
     *
     * @return
     * @throws IOException
     */
    public LivySessionInfo selectAvailableSession() throws IOException {

        LivySessionDescription livySessionDescription = getSession();
        LivySessionInfo availableSession = new LivySessionInfo();

        for (LivySessionInfo sessionInfo : livySessionDescription.getSessions()) {
            if (sessionInfo.getState().equals("idle")) {
                availableSession = sessionInfo;
                break;
            }
            availableSession = null;
        }
        if (livySessionDescription.getTotal() == 0 || availableSession == null) {
            System.out.print("Not a single idle session is available. Wait to create a new Livy Session");
            LivySessionInfo newSession = LivyService.createSession();
            while (!getSession(newSession.getId()).getState().equals("idle")) {
                System.out.print(".");
                try {
                    Thread.sleep(1000);
                    //防止频繁get
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Create A New Session." + "ID :" + newSession.getId());
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
    public LivySessionInfo getSession(int id) throws IOException {

        String sessionUrl;

        sessionUrl = "http://" + livyAddr + "/sessions/" + id;

        RestTemplate restTemplate = new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl, String.class);

        return objectMapper.readValue(res, LivySessionInfo.class);

    }

    /**
     * 获取 所有Session
     *
     * @return
     * @throws IOException
     */
    public LivySessionDescription getSession() throws IOException {

        String sessionUrl;

        sessionUrl = "http://" + livyAddr + "/sessions";

        RestTemplate restTemplate = new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl, String.class);

        return objectMapper.readValue(res, LivySessionDescription.class);

    }

    public static LivySessionInfo createSession() throws IOException {


        String session_url = "http://10.105.222.90:8998/sessions";
        //header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        //body2json
        Map<String, Object> bodyHashMap = new HashMap<>();
        Map<String, Object> confHashMap = new HashMap<>();
        bodyHashMap.put("kind", "spark");
        List<String> jarsList = Arrays.asList("hdfs:///livy_jars/scalaj-http_2.10-2.0.0.jar",
                "hdfs:///livy_jars/bigdl-SPARK_2.3-0.8.0-jar-with-dependencies.jar");
        bodyHashMap.put("jars", jarsList);
        bodyHashMap.put("numExecutors", 4);
        bodyHashMap.put("executorCores", 4);
        confHashMap.put("spark.shuffle.reduceLocality.enabled", false);
        confHashMap.put("spark.shuffle.blockTransferService", "nio");
        confHashMap.put("spark.scheduler.minRegisteredResourcesRatio", 1.0);
        confHashMap.put("spark.speculation", false);
        bodyHashMap.put("conf", confHashMap);

        String jsonBody = objectMapper.writeValueAsString(bodyHashMap);

        //restTemplate
        System.out.println(jsonBody);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, headers);
        ResponseEntity<String> res = restTemplate.exchange(session_url, HttpMethod.POST, httpEntity, String.class);

        LivySessionInfo livySessionInfo = objectMapper.readValue(res.getBody(), LivySessionInfo.class);


        return livySessionInfo;
    }


}
