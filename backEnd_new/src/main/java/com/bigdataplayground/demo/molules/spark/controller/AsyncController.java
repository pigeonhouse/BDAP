package com.bigdataplayground.demo.molules.spark.controller;

import com.bigdataplayground.demo.molules.spark.service.AsyncStatisticsService;
import com.bigdataplayground.demo.molules.spark.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AsyncController {
    @Autowired
    private CommonService commonService;
    @Autowired
    private AsyncStatisticsService asyncStatisticsService;

    @RequestMapping("/async")
    public String demo() {
        commonService.dealCommonService_1();
        asyncStatisticsService.asyncStatistics();
        commonService.dealCommonService_2();
        return "SUCCESS";
    }
}