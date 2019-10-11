package com.pigeonhouse.bdap.util.token;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.metadata.User;
import com.pigeonhouse.bdap.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:26
 * 使用jwt进行页面拦截
 */
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Autowired
    UserDao userDao;

    @Autowired
    TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object object) throws Exception {
        Cookie[] cookies = httpServletRequest.getCookies();

        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("loginToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }

        // 如果不是映射到方法直接通过
        if (!(object instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) object;
        Method method = handlerMethod.getMethod();

        JSONObject json = new JSONObject();
        httpServletResponse.setHeader("Content-Type", "application/json; charset=UTF-8");
        PrintWriter out;

        //检查是否有passToken注释，有则跳过认证
        if (method.isAnnotationPresent(PassToken.class)) {
            return true;
        } else {
            if (token == null) {
                json.put("msg", "无token，请重新登录");
                out = httpServletResponse.getWriter();
                out.append(json.toJSONString());
                return false;
            }
            // 解析token
            String userId;
            Map<String, Claim> claims;
            try {
                userId = JWT.decode(token).getAudience().get(0);
                claims = JWT.decode(token).getClaims();
            } catch (JWTDecodeException j) {
                json.put("msg", "token错误");
                out = httpServletResponse.getWriter();
                out.append(json.toJSONString());
                return false;
            }
            String livyAddr = claims.get("livyAddr").asString();
            Integer sessionId = claims.get("sessionId").asInt();

            User user = userDao.findByUserId(userId);
            if (user == null) {
                json.put("msg", "用户不存在，请重新登录");
                out = httpServletResponse.getWriter();
                out.append(json.toJSONString());
                return false;
            }
            // 验证 token
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getUserId())).build();
            try {
                jwtVerifier.verify(token);
            } catch (JWTVerificationException e) {
                json.put("msg", "连接超时，请重新登录");
                out = httpServletResponse.getWriter();
                out.append(json.toJSONString());
                return false;
            }

            //刷新cookie
            Cookie cookie = new Cookie("token", tokenService.getLoginToken(userId, livyAddr, sessionId));
            httpServletResponse.addCookie(cookie);
            return true;
        }


    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest,
                           HttpServletResponse httpServletResponse,
                           Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest,
                                HttpServletResponse httpServletResponse,
                                Object o, Exception e) throws Exception {
    }
}
