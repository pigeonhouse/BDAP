package com.pigeonhouse.livyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/24 10:26
 */
@RestController
public class test {

    @Autowired
    DiscoveryClient discoveryClient;

    @RequestMapping("/test")
    public String test(){
//        String services = "Services: " + discoveryClient.getServices();
//        System.out.println(services);
        return "hello world";
    }
}

