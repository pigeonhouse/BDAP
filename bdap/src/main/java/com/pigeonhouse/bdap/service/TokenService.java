package com.pigeonhouse.bdap.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pigeonhouse.bdap.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:39
 * 生成token
 */
@Service("TokenService")
public class TokenService {

    @Value("${token.expireTime}")
    int expireTime;

    public String getToken(User user) {

        String token = "";
        Date date = new Date(System.currentTimeMillis() + expireTime);
        token = JWT.create().withAudience(user.getId())
                .withExpiresAt(date)
                .sign(Algorithm.HMAC256(user.getPassword()));

        return token;
    }
}
