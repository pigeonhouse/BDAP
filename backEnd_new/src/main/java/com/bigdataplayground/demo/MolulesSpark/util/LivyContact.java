package com.bigdataplayground.demo.MolulesSpark.util;

import com.bigdataplayground.demo.MolulesSpark.LivySessionDescription;
import com.bigdataplayground.demo.MolulesSpark.LivySessionInfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 一些Livy通信上的常用代码，获取Session状态，创建Session，执行代码等。均是static
 */
public class LivyContact {
    private static ObjectMapper objectMapper = new ObjectMapper();
    /**
     * 提交.scala至livy
     * @param livyAddr
     * @param code
     * @return
     * @throws IOException
     */

    public static void postCode (String livyAddr, String code) throws IOException {

        LivySessionInfo availableSession = selectAvailableSession(livyAddr);

        Map<String,String> map = new HashMap<>();
        map.put("code",code);
        map.put("kind","spark");
        String jsonData = objectMapper.writeValueAsString(map);

        String availableSessionUrl = "http://"+livyAddr+"/sessions/"+availableSession.getId();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonData, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> compute = restTemplate.exchange(
                availableSessionUrl + "/statements",
                HttpMethod.POST, httpEntity, String.class
        );

        String resultUrl = "http://"+livyAddr+ compute.getHeaders().get("location").get(0);

        System.out.println("#resultUrl#");
        System.out.println(resultUrl);

        while(true){
            if(objectMapper.readValue(
                    restTemplate.getForObject(resultUrl,String.class),Map.class)
                    .get("state").equals("available")
            ){
                System.out.println("#post finished#");
                break;
            }
        }
        return ;

    }
    /**
     * 选择空闲Session，否则创建一个
     * @param livyAddr
     * @return
     * @throws IOException
     */
    public static LivySessionInfo selectAvailableSession(String livyAddr) throws IOException {

        LivySessionDescription livySessionDescription = getSession(livyAddr);
        LivySessionInfo availableSession = new LivySessionInfo();

        for(LivySessionInfo sessionInfo:livySessionDescription.getSessions()){
            if(sessionInfo.getState().equals("idle")){
                availableSession = sessionInfo;
                break;
            }
            availableSession = null;
        }

        if(livySessionDescription.getTotal()==0 || availableSession==null){
            LivySessionInfo newSession = LivyContact.createSession();
            System.out.print("Wait a new Livy Session");
            while(!LivyContact.getSession(livyAddr,newSession.getId()).getState().equals("idle")){
                System.out.print(".");
                try {
                    Thread.sleep(1000); //防止频繁get
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Create A New Session."+"ID :"+newSession.getId());
            availableSession = newSession;
        }

        return availableSession;
    }


    /**
     * 获取某个Session信息（用来获取state）
     * @param livyAddr
     * @param id
     * @return
     * @throws IOException
     */
    public static LivySessionInfo getSession(String livyAddr, int id) throws IOException {
        String sessionUrl;

        sessionUrl = "http://"+ livyAddr +"/sessions/"+id;

        RestTemplate restTemplate=new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl,String.class);

        return objectMapper.readValue(res,LivySessionInfo.class);

    }

    /**
     * 获取 所有Session
     * @param livyAddr
     * @return
     * @throws IOException
     */
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
        //header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        //body2json
        hashMap.put("kind","spark");
        List<String> jarsList = Arrays.asList("hdfs:///livy_jars/scalaj-http_2.10-2.0.0.jar");
        hashMap.put("jars",jarsList);

        String jsonBody = objectMapper.writeValueAsString(hashMap);
        //restTemplate
        RestTemplate restTemplate=new RestTemplate();
        HttpEntity<String> httpEntity=new HttpEntity<>(jsonBody,headers);
        ResponseEntity<String> res = restTemplate.exchange(session_url, HttpMethod.POST,httpEntity,String.class);

        LivySessionInfo livySessionInfo = objectMapper.readValue(res.getBody(),LivySessionInfo.class);


        return livySessionInfo;
    }


}
