package com.pigeonhouse.bdap.controller;

import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.UserService;
import com.pigeonhouse.bdap.util.token.PassToken;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.LoginStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:38
 */
@RestController
public class UserApi {
    @Autowired
    UserService userService;
    @Autowired
    TokenService tokenService;

    @PassToken
    @PostMapping("/login")
    public Object login(@RequestBody() User user, HttpServletResponse response) {

        User userForBase = userService.findUserById(user.getUserId());
        if (userForBase == null) {
            return new Response(LoginStatus.NO_SUCH_USER, null);
        } else {
            if (!userForBase.getPassword().equals(user.getPassword())) {
                return new Response(LoginStatus.WRONG_PASSWORD, null);
            } else {
                String token = tokenService.getToken(user.getUserId());
                Cookie cookie = new Cookie("token", token);
                response.addCookie(cookie);
                return new Response(LoginStatus.SUCCESS, userForBase);
            }
        }
    }


}
