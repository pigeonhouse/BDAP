//package com.bigdataplayground.demo.MolulesSpark;
//
//
//import com.alibaba.fastjson.JSONArray;
//import com.alibaba.fastjson.JSONObject;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestClientException;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//
//@RestController
//public class RestTest {
//    @RequestMapping("/test")
//    public void test() {
//        RestTemplate restT = new RestTemplate();
//        String fileName = "train_demo.csv";
//        JSONObject res = null;
//
//
//
//
//        MultiValueMap<String, Object> paramMap = new LinkedMultiValueMap<>();
//        paramMap.add("fileName","train_demo.csv");
//
//        JSONObject obj = new JSONObject();
//        obj.put("kind", "spark");
//
//        //List list = restT.postForObject("http://10.105.222.92:3000/showData",paramMap, List.class);
//        //res = restT.getForObject("http://10.105.222.90:8998/sessions", JSONObject.class);
//
//        //res = restT.postForObject("http://10.105.222.90:8998/sessions", obj, JSONObject.class);
//
//
//        //System.out.println(list);
//    }
//}
