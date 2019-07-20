package com.bigdataplayground.demo.MolulesSpark.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Async
public class AsyncStatisticsService {

    public void asyncStatistics() {
        try {
            Thread.sleep(3000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("异步统计业务...");
        throw new IllegalArgumentException("异步统计业务异常...");
    }
}