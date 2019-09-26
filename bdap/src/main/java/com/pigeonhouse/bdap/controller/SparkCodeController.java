package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SparkCodeController {

    @Autowired
    SparkCodeService sparkCodeService;

    /**
     * 返回算法模块的参数信息
     * @return 算法模块名称和参数
     */
    @PostMapping("/module")
    public String returnSparkCode(){
        List<String> all = sparkCodeService.findAllToJson();
        return all.toString();
    }

}
