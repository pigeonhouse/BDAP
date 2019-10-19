package com.pigeonhouse.bdap.dao;

import com.alibaba.fastjson.JSONObject;
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
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * @Author: HouWeiying
 * @Date: 2019/9/7 11:33
 */
@Repository("LivyDao")
public class LivyDao {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private static ObjectMapper objectMapper = new ObjectMapper();


    @Value("${livyNewSessionJars}")
    String livyNewSessionJars;
    @Value("${livyNewSessionKind}")
    String livyNewSessionKind;
    @Value("${numExecutors}")
    int numExecutors;
    @Value("${executorCores}")
    int executorCores;


    @Value("${livyAddr}")
    String[] livyAddrList;

    /**
     * 根据数据库中记录的livy服务器负载情况
     * 选择一个负载最低的livy服务器
     * @return 返回该服务器地址及端口
     */
    public String selectLivyServer() {
        int minNumber = Integer.MAX_VALUE;
        int minIndex = -1;
        for (int i = 0; i < livyAddrList.length; i++) {
            RestTemplate restTemplate = new RestTemplate();
            String res = restTemplate.getForObject("http://" + livyAddrList[i] + "/sessions", String.class);
            LinkedHashMap livySessionDescription = null;
            try {
                livySessionDescription = objectMapper.readValue(res, LinkedHashMap.class);
            } catch (IOException e) {
                e.printStackTrace();
            }
            int num = (int) livySessionDescription.get("total");
            if (num < minNumber) {
                minNumber = num;
                minIndex = i;
            }
        }
        return livyAddrList[minIndex];
    }


    /**
     * 提交.scala至livy
     *
     * @param code
     * @return
     */
    public String postCode(String code, LivySessionInfo livySessionInfo) {
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
        //TODO 编程API
        try {
            LivyClient livyClient = new LivyClientBuilder().setURI(new URI(livyAddr)).build();
        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
        }
    }
    //--------------------------------------------------------------------------
    /**
     * 仅供测试时使用！！！选择空闲Session，否则创建一个
     * @return
     */
    public LivySessionInfo selectAvailableSessionFromFour(){
        try {
            return selectAvailableSession(livyAddrList[(int)(Math.random()*4)]);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    public static LivySessionInfo selectAvailableSession(String livyAddr) throws IOException {

        LinkedHashMap livySessionDescription = getSession(livyAddr);
        LivySessionInfo availableSession = null;

        System.out.println("livySessionDescription");

        List<LinkedHashMap> sessionInfos = (List<LinkedHashMap>)livySessionDescription.get("sessions");

        for (LinkedHashMap sessionInfo : sessionInfos) {
            if (sessionInfo.get("state").equals("idle")) {
                availableSession = new LivySessionInfo(livyAddr, (int)sessionInfo.get("id"));
                System.out.println("---------got one------------");
                System.out.println(sessionInfo);
                break;
            }
        }
        return availableSession;
    }

    public static LinkedHashMap getSession(String livyAddr) throws IOException {
        String sessionUrl;
        sessionUrl = "http://" + livyAddr + "/sessions";
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(sessionUrl, String.class);
        return objectMapper.readValue(res, LinkedHashMap.class);
    }

    //-----------------------上面的仅供测试时使用----------------------------------------

    public void deleteSession(String id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete("http://" + "10.105.222.90:8998" + "/sessions" + "/" + id);
        return;
    }

    public LivySessionInfo refreshSessionStatus(LivySessionInfo livySessionInfo) {
        String livyAddr = livySessionInfo.getLivyAddr();
        int sessionId = livySessionInfo.getId();
        String sessionUrl = "http://" + livyAddr + "/sessions" + "/" + sessionId;
        RestTemplate restTemplate = new RestTemplate();
        String res = restTemplate.getForObject(sessionUrl, String.class);
        LivySessionInfo newLivySessionInfo = new LivySessionInfo();
        try {
            JSONObject response = objectMapper.readValue(res, JSONObject.class);
            newLivySessionInfo.setState(response.get("state").toString());
            newLivySessionInfo.setLivyAddr(livyAddr);
            newLivySessionInfo.setId((int) response.get("id"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newLivySessionInfo;
    }


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
            JSONObject response = objectMapper.readValue(res.getBody(), JSONObject.class);
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
}
