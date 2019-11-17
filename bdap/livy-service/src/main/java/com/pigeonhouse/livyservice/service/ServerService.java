package com.pigeonhouse.livyservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.LinkedHashMap;


@Service
public class ServerService {
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
                livySessionDescription = new ObjectMapper().readValue(res, LinkedHashMap.class);
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

}
