package com.xxy.python_executor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/7/9 20:03
 */
@RestController
public class test {
    @RequestMapping("/test")
    public Long run(){
        String[] arguments = new String[]{"python","C:\\Users\\Surface\\Desktop\\test.py","99999"};
        long startTime =  System.currentTimeMillis();
        System.out.println("started!");
        try {
            Process process = Runtime.getRuntime().exec(arguments);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            int re = process.waitFor();

        } catch (Exception e) {
            e.printStackTrace();
        }
        long endTime =  System.currentTimeMillis();
        long usedTime = (endTime-startTime)/1000;

        System.out.println("--------------");
        System.out.println(String.format("%d is ",1000));
        System.out.println("over,used time: "+usedTime);

        return usedTime;
    }
}
