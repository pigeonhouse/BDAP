package com.ex.demo.util;

import com.ex.demo.LivySessionDescription;
import com.ex.demo.LivySessionInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LivyContact {
    private static ObjectMapper objectMapper;

    public static LivySessionInfo getSession(String livyAddr, int id) throws IOException {
        String sessionUrl;

        sessionUrl = "http://"+ livyAddr +"/sessions/"+id;

        RestTemplate restTemplate=new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl,String.class);

        return objectMapper.readValue(res,LivySessionInfo.class);

    }
    public static LivySessionDescription getSession(String livyAddr) throws IOException {
        String sessionUrl;

        sessionUrl = "http://"+ livyAddr +"/sessions";

        RestTemplate restTemplate=new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl,String.class);

        return objectMapper.readValue(res,LivySessionDescription.class);

    }

    public static LivySessionInfo createSession() throws IOException {
        Map<String, Object> hashMap = new HashMap<>();

        String session_url = "http://10.105.222.90:8998/sessions";
        /**
         * header
         */
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        /**
         * body map2json
         */
        hashMap.put("kind","spark");
        List<String> jarsList = Arrays.asList("hdfs:///livy_jars/scalaj-http_2.10-2.0.0.jar");
        hashMap.put("jars",jarsList);


        String jsonBody = objectMapper.writeValueAsString(hashMap);
        /**
         * restTemplate
         */
        RestTemplate restTemplate=new RestTemplate();
        HttpEntity<String> httpEntity=new HttpEntity<>(jsonBody,headers);
        ResponseEntity<String> res = restTemplate.exchange(session_url, HttpMethod.POST,httpEntity,String.class);

        LivySessionInfo livySessionInfo = objectMapper.readValue(res.getBody(),LivySessionInfo.class);


        return livySessionInfo;
    }

    public static LivySessionInfo selectIdleSession(LivySessionDescription livySessionDescription){
        for(LivySessionInfo sessionInfo:livySessionDescription.getSessions()){
            if(sessionInfo.getState().equals("idle")){
                return sessionInfo;
            }
        }
        return null;
    }
}
