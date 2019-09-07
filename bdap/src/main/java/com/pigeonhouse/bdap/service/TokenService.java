package com.pigeonhouse.bdap.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pigeonhouse.bdap.entity.User;
import org.springframework.stereotype.Service;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:39
 */
@Service("TokenService")
public class TokenService {
    public String getToken(User user) {
        String token = "";
        token = JWT.create().withAudience(user.getId())
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }
}
