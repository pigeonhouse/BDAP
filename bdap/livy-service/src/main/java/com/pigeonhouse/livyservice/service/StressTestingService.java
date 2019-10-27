package com.pigeonhouse.livyservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Note:仅在测试时使用
 */
@Service
public class StressTestingService {
    @Value("${livyAddr}")
    String[] livyAddrList;

    public LivySessionInfo selectAvailableSessionFromFour() {
        try {
            return selectAvailableSession(livyAddrList[(int) (Math.random() * 4)]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static LivySessionInfo selectAvailableSession(String livyAddr) throws IOException {

        LinkedHashMap livySessionDescription = getSession(livyAddr);
        LivySessionInfo availableSession = null;

        System.out.println("livySessionDescription");

        List<LinkedHashMap> sessionInfos = (List<LinkedHashMap>) livySessionDescription.get("sessions");

        for (LinkedHashMap sessionInfo : sessionInfos) {
            if (sessionInfo.get("state").equals("idle")) {
                availableSession = new LivySessionInfo(livyAddr, (int) sessionInfo.get("id"));
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
        return new ObjectMapper().readValue(res, LinkedHashMap.class);
    }

}
