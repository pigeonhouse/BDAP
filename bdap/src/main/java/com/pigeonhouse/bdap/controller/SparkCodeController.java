package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SparkCodeController {

    @Autowired
    SparkCodeService sparkCodeService;

    @GetMapping("/hello")
    public String returnSparkCode(){
        List<String> all = sparkCodeService.findAllToJson();
        return all.toString();
    }
}
