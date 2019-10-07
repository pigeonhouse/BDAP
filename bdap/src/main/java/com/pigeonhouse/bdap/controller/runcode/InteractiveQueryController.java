package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.FormatConverter;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/29 10:44
 */
@RestController
public class InteractiveQueryController {

    @Autowired
    LivyDao livyDao;

    @Autowired
    TokenService tokenService;


    @RequestMapping("/query/sql")
    public Response sqlQuery(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);

        String sql = request.getParameter("sql");
        String code = "spark.sql(\"" + sql + "\").show()";
        String resultUrl = livyDao.postCode(code, livySessionInfo);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            RestTemplate restTemplate = new RestTemplate();
            String state = "";
            String resultText = "";
            Map resultMap = null;
            while (!"available".equals(state)) {
                Thread.sleep(200);
                resultMap = objectMapper.readValue(
                        restTemplate.getForObject(resultUrl, String.class), Map.class);
                state = resultMap.get("state").toString();
            }
            LinkedHashMap<String, Object> outputMap = (LinkedHashMap) resultMap.get("output");
            LinkedHashMap<String, Object> data = (LinkedHashMap) outputMap.get("data");
            resultText = data.get("text/plain").toString();
            System.out.println(resultText);
            String result = FormatConverter.convertToCsv(resultText);


            JSONObject returnJson = new JSONObject();
            returnJson.put("state", state);
            returnJson.put("result", result);
            return new Response(RunningStatus.SUCCESSFUL_QUERY, returnJson);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new Response(RunningStatus.FAIL_TO_QUERY, null);
    }


    @RequestMapping("/query/readyForData")
    public void readyForData(HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);

        String filePath = request.getParameter("filePath");
        String readDataCode = "val df = spark.read.option(\"header\",\"true\").csv(\"hdfs:///" + filePath + "\")" + "\n"
                + "df.createOrReplaceTempView(\"data\")";

        livyDao.postCode(readDataCode,livySessionInfo);

        while (!"idle".equals(livyDao.refreshSessionStatus(livySessionInfo).getState())) {
            try{
                Thread.sleep(1000);
                System.out.println("ready for data...");
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        System.out.println("finish");
    }

}
