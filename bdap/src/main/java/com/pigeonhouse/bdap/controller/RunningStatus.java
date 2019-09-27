package com.pigeonhouse.bdap.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * spark向后端发送进度
 * @author HouWeiying
 */
@RestController
public class RunningStatus {
    @PostMapping(value = "/runningStatus")
    public void showStatus(@RequestBody String saying){
        System.out.println(saying);
    }
}
