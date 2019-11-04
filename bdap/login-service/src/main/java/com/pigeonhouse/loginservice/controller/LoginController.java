package com.pigeonhouse.loginservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.loginservice.dao.TokenDao;
import com.pigeonhouse.loginservice.dao.UserDao;
import com.pigeonhouse.loginservice.entity.LivySessionInfo;
import com.pigeonhouse.loginservice.entity.RefreshToken;
import com.pigeonhouse.loginservice.entity.User;
import com.pigeonhouse.loginservice.service.LivyService;
import com.pigeonhouse.loginservice.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

@RestController
public class LoginController {

    @Autowired
    LivyService livyService;
    @Autowired
    UserDao userDao;
    @Autowired
    TokenDao tokenDao;
    @Autowired
    RefreshTokenService refreshTokenService;

    @Value("${token.access-token.expireTime}")
    int accessTokenExpireTime;
    @Value("${token.refresh-token.expireTime}")
    int refreshTokenExpireTime;


    @PostMapping("/login")
    public ResponseEntity<JSONObject> login(@RequestBody() User user) {
        try {
            User userForBase = userDao.findByUserId(user.getUserId());
            if (userForBase == null) {
                //用户不存在
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                if (!userForBase.getPassword().equals(user.getPassword())) {
                    //密码错误
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                } else {
                    //成功
                    String userId = user.getUserId();
                    String livyAddr, accessToken, refreshToken = "";
                    int sessionId;
                    SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    timeFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));

                    RefreshToken tokenAndExpireTime = tokenDao.findRefreshTokenByUserId(userId);
                    if (tokenAndExpireTime != null && new Date().before(timeFormat.parse(tokenAndExpireTime.getExpireAt()))) {
                        //已经登陆过并且存在现成的session
                        Map<String, Claim> claims = JWT.decode(tokenAndExpireTime.getRefreshToken()).getClaims();
                        livyAddr = claims.get("livyAddr").asString();
                        sessionId = claims.get("sessionId").asInt();
                        accessToken = refreshTokenService.refreshToken(tokenAndExpireTime.getRefreshToken());
                        refreshToken = tokenAndExpireTime.getRefreshToken();
                    } else {
                        //创建过session但过期了
                        if(tokenAndExpireTime != null){
                            tokenDao.deleteRefreshTokenByUserId(userId);
                        }
                        //创建新session
                        LivySessionInfo livySessionInfo = livyService.newSession();
                        livyAddr = livySessionInfo.getLivyAddr();
                        sessionId = livySessionInfo.getId();

                        accessToken = JWT.create().withAudience(userId)
                                .withClaim("userId", userId)
                                .withClaim("livyAddr", livyAddr)
                                .withClaim("sessionId", sessionId)
                                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpireTime))
                                .sign(Algorithm.HMAC256(userId));

                        refreshToken = JWT.create().withAudience(userId)
                                .withClaim("userId", userId)
                                .withClaim("livyAddr", livyAddr)
                                .withClaim("sessionId", sessionId)
                                .sign(Algorithm.HMAC256(userId));

                        RefreshToken newRefreshToken = new RefreshToken();
                        newRefreshToken.setUserId(userId);
                        newRefreshToken.setExpireAt(timeFormat.format(new Date(System.currentTimeMillis() + refreshTokenExpireTime)));
                        newRefreshToken.setRefreshToken(refreshToken);
                        tokenDao.insertNewToken(newRefreshToken);

                    }

                    JSONObject data = new JSONObject();
                    data.put("userInfo", userForBase);
                    data.put("sessionInfo", new LivySessionInfo(livyAddr, sessionId));
                    data.put("accessToken", accessToken);
                    data.put("refreshToken", refreshToken);

                    return ResponseEntity.ok(data);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
