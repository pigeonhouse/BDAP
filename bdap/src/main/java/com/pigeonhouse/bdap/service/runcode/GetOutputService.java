package com.pigeonhouse.bdap.service.runcode;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.bdap.util.FormatConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/7 12:55
 */
@Service
public class GetOutputService {
    public String getOutput(String resultUrl) throws Exception{
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
        return data.get("text/plain").toString();

    }
}
