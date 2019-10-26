package com.pigeonhouse.loginservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.loginservice.dao.UserDao;
import com.pigeonhouse.loginservice.entity.LivySessionInfo;
import com.pigeonhouse.loginservice.entity.User;
import com.pigeonhouse.loginservice.service.LivyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletResponse;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 20:16
 */
public class LoginController {
    @Autowired
    DiscoveryClient discoveryClient;
    @Autowired
    LivyService livyService;
    @Autowired
    UserDao userDao;

    @PostMapping("/login")
    public ResponseEntity<JSONObject> login(@RequestBody() User user, HttpServletResponse response) {
        User userForBase = userDao.findByUserId(user.getUserId());
        if (userForBase == null) {
            //用户不存在
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (!userForBase.getPassword().equals(user.getPassword())) {
                //密码错误
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                LivySessionInfo livySessionInfo = livyService.newSession();
                Integer sessionId = livySessionInfo.getId();
                String token = tokenService.getLoginToken(user.getUserId(), livyAddr, sessionId);

                JSONObject sessionInfo = new JSONObject();
                sessionInfo.put("livyAddr", livyAddr);
                sessionInfo.put("sessionId", sessionId);

                JSONObject data = new JSONObject();
                data.put("userInfo", userForBase);
                data.put("sessionInfo", sessionInfo);

                JSONObject returnJson = new JSONObject();
                returnJson.put("code",200);
                returnJson.put("message","登录成功");
                returnJson.put("token",token);
                returnJson.put("data",data);

                return returnJson;
            }
        }
    }
}
