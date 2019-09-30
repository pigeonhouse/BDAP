package com.pigeonhouse.bdap.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:39
 * 生成token
 */
@Service("TokenService")
public class TokenService {

    @Value("${token.expireTime}")
    int expireTime;

    public String getLoginToken(String id,String livyAddr,Integer sessionId) {
        Date date = new Date(System.currentTimeMillis() + expireTime);
        return JWT.create().withAudience(id)
                .withClaim("userId",id)
                .withClaim("livyAddr",livyAddr)
                .withClaim("sessionId",sessionId)
                //.withExpiresAt(date)
                .sign(Algorithm.HMAC256(id));

    }

    public String getTokenFromRequest(HttpServletRequest request,String tokenName){
        Cookie[] cookies = request.getCookies();
        String token = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (tokenName.equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }
        return token;
    }

    public Claim getFromToken(String token,String keyName){
        Map<String, Claim> claims = JWT.decode(token).getClaims();
        return claims.get(keyName);
    }


}
