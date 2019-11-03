package com.pigeonhouse.loginservice.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.loginservice.dao.TokenDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

@Service
public class RefreshTokenService {

    @Value("${token.access-token.expireTime}")
    int accessTokenExpireTime;

    @Autowired
    TokenDao tokenDao;

    public String refreshToken(@RequestHeader("refreshToken") String refreshToken) throws Exception{

        Map<String, Claim> claims = JWT.decode(refreshToken).getClaims();
        String userId = claims.get("userId").asString();
        String livyAddr = claims.get("livyAddr").asString();
        int sessionId = claims.get("sessionId").asInt();

        SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        timeFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));

        Date oldTokenExpireAt = timeFormat.parse(tokenDao.findRefreshTokenByUserId(userId).getExpireAt());
        if (new Date().before(oldTokenExpireAt)) {
            //refreshToken未过期，获取新accessToken
            return JWT.create().withAudience(userId)
                    .withClaim("userId", userId)
                    .withClaim("livyAddr", livyAddr)
                    .withClaim("sessionId", sessionId)
                    .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpireTime))
                    .sign(Algorithm.HMAC256(userId));

        } else {
            //refreshToken过期，删除数据库中的token信息
            tokenDao.deleteRefreshTokenByUserId(userId);
            throw new Exception();
        }

    }

}
