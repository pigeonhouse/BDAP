package com.pigeonhouse.zuulgateway.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.pigeonhouse.zuulgateway.dao.UserDao;
import com.pigeonhouse.zuulgateway.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/24 11:20
 */
public class TokenFilter extends ZuulFilter {

    @Autowired
    UserDao userDao;

    private static Logger log = LoggerFactory.getLogger(TokenFilter.class);

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        log.info("send {} request to {}", request.getMethod(), request.getRequestURL().toString());
        Cookie[] cookies = request.getCookies();

        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("loginToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            log.warn("loginToken is empty");
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(401);
            ctx.setResponseBody("无token，请重新登录");
            return null;
        }

        String userId;
        try {
            userId = JWT.decode(token).getAudience().get(0);
        } catch (JWTDecodeException j) {
            log.warn("loginToken is invalid");
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(402);
            ctx.setResponseBody("token错误");
            return null;
        }
        User user = userDao.findByUserId(userId);
        if (user == null) {
            log.warn("用户不存在，请重新登录");
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(403);
            ctx.setResponseBody("用户不存在，请重新登录");
            return null;
        }


        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getUserId())).build();
        try {
            jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            log.warn("连接超时，请重新登录");
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(404);
            ctx.setResponseBody("连接超时，请重新登录");
            return null;
        }


        log.info("token验证通过");
        return null;
    }

}
