package com.pigeonhouse.bdap.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
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

    public String getToken(String id) {

        String token;
        Date date = new Date(System.currentTimeMillis() + expireTime);
        token = JWT.create().withAudience(id)
                //.withExpiresAt(date)
                .sign(Algorithm.HMAC256(id));

        return token;
    }
}
