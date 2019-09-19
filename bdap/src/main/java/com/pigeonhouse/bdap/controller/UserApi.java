package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.User;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.UserService;
import com.pigeonhouse.bdap.util.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Object login(@RequestBody()User user, HttpServletResponse response) {
        JSONObject jsonObject = new JSONObject();
        User userForBase = userService.findUserById(user.getId());
        if (userForBase == null) {
            jsonObject.put("isSuccess", "false");
            jsonObject.put("message", "登录失败,用户不存在");
            return jsonObject;
        } else {
            if (!userForBase.getPassword().equals(user.getPassword())) {
                jsonObject.put("isSuccess", "false");
                jsonObject.put("message", "登录失败,密码错误");
                return jsonObject;
            } else {
                String token = tokenService.getToken(user.getId());
                Cookie cookie = new Cookie("token",token);
                response.addCookie(cookie);
                jsonObject.put("isSuccess", "true");
                jsonObject.put("message", "登录成功");

                //jsonObject.put("token", token);

                jsonObject.put("user", userForBase);
                return jsonObject;
            }
        }
    }


    @GetMapping("/getMessage")
    public String getMessage() {
        return "你已通过验证";
    }
}
