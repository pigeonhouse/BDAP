package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.CommonFilesDao;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.dao.ModuleDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;
import com.pigeonhouse.bdap.entity.metadata.User;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.LoginStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:38
 */
@RestController
public class LoginController {
    @Autowired
    UserDao userDao;
    @Autowired
    TokenService tokenService;
    @Autowired
    LivyDao livyDao;
    @Autowired
    ModuleDao moduleDao;
    @Autowired
    CommonFilesDao commonFilesDao;


    @PassToken
    @PostMapping("/login")
    public Object login(@RequestBody() User user, HttpServletResponse response) {

        User userForBase = userDao.findByUserId(user.getUserId());
        if (userForBase == null) {
            //不存在这个用户
            return new Response(LoginStatus.NO_SUCH_USER, null);
        } else {
            if (!userForBase.getPassword().equals(user.getPassword())) {
                //密码错误
                return new Response(LoginStatus.WRONG_PASSWORD, null);
            } else {
                String livyAddr = livyDao.selectLivyServer();
                LivySessionInfo livySessionInfo = livyDao.createSession(livyAddr);
                Integer sessionId = livySessionInfo.getId();
                String token = tokenService.getLoginToken(user.getUserId(), livyAddr, sessionId);
                //成功，获取token并将其置于cookie中返回前端
                Cookie cookie = new Cookie("loginToken", token);
                response.addCookie(cookie);

                JSONObject sessionInfo = new JSONObject();
                sessionInfo.put("livyAddr", livyAddr);
                sessionInfo.put("sessionId", sessionId);

                ArrayList<FileAttribute> fileList = commonFilesDao.findByUserId(user.getUserId());
                List<NodeInfo> moduleList = moduleDao.findAll();

                JSONObject draggableModuleInfo = new JSONObject();
                draggableModuleInfo.put("files",fileList);
                draggableModuleInfo.put("nodes",moduleList);

                JSONObject returnJson = new JSONObject();
                returnJson.put("userInfo", userForBase);
                returnJson.put("sessionInfo", sessionInfo);
                returnJson.put("draggableModuleInfo",draggableModuleInfo);

                return new Response(LoginStatus.SUCCESS, returnJson);
            }
        }
    }


}
