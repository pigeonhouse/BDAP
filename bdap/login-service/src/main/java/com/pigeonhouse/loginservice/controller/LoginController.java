package com.pigeonhouse.loginservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
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
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 20:16
 */
@RestController
public class LoginController {

    @Autowired
    LivyService livyService;

    @Autowired
    UserDao userDao;

    @PostMapping("/login")
    public ResponseEntity<JSONObject> login(@RequestBody() User user) {
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

                String userId = user.getUserId();
                String livyAddr = livySessionInfo.getLivyAddr();
                Integer sessionId = livySessionInfo.getId();

                String token = JWT.create().withAudience(userId)
                        .withClaim("userId", userId)
                        .withClaim("livyAddr", livyAddr)
                        .withClaim("sessionId", sessionId)
                        //.withExpiresAt(date)
                        .sign(Algorithm.HMAC256(userId));

                JSONObject sessionInfo = new JSONObject();
                sessionInfo.put("livyAddr", livyAddr);
                sessionInfo.put("sessionId", sessionId);

                JSONObject data = new JSONObject();
                data.put("userInfo", userForBase);
                data.put("sessionInfo", sessionInfo);
                data.put("token",token);

                return ResponseEntity.ok().body(data);
            }
        }
    }
}
