package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * spark向后端发送进度
 * @author HouWeiying
 */

@RestController
public class RunningStatus {
    @PassToken
    @PostMapping(value = "/runningStatus")
    public void showStatus(@RequestBody String saying){
        System.out.println(saying);
    }
}
