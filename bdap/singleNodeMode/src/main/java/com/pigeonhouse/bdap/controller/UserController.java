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
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CodeStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.LoginStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:38
 * 本Controller进行了跨层调用，调用列表功能说明如下:
 * 1.调用UserDao访问user数据库核对登录信息
 * 2.调用LivyDao获取livyIP地址
 * 3.调用MoudleDao获取用户项目信息拓扑图
 * 4.调用CommonFilesDao获取用户常用文件
 */
@RestController
public class UserController {
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

    @Autowired
    ResponseService responseService;


    @PassToken
    @PostMapping("/login")
    public Object login(@RequestBody() User user, HttpServletResponse response) {

        User userForBase = userDao.findByUserId(user.getUserId());
        if (userForBase == null) {
            //不存在这个用户
            return responseService.response(LoginStatus.NO_SUCH_USER, null,null);
        } else {
            if (!userForBase.getPassword().equals(user.getPassword())) {
                //密码错误
                return responseService.response(LoginStatus.WRONG_PASSWORD, null,null);
            } else {
                String livyAddr = livyDao.selectLivyServer();
                LivySessionInfo livySessionInfo = livyDao.createSession(livyAddr);
                Integer sessionId = livySessionInfo.getId();
                String token = tokenService.getLoginToken(user.getUserId(), livyAddr, sessionId);

                JSONObject sessionInfo = new JSONObject();
                sessionInfo.put("livyAddr", livyAddr);
                sessionInfo.put("sessionId", sessionId);

                JSONObject data = new JSONObject();
                data.put("userInfo", userForBase);
                data.put("sessionInfo", sessionInfo);



                JSONObject returnJson = new JSONObject();
                returnJson.put("code",200);
                returnJson.put("message","登录成功");
                returnJson.put("token",token);
                returnJson.put("data",data);

                return returnJson;
            }
        }
    }

    /**
     * 获取该用户所有可拖拽模块信息
     * @param request
     * @return
     */
    @GetMapping("/module")
    public Response moduleInfo(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();
        ArrayList<FileAttribute> fileList = commonFilesDao.findByUserId(userId);
        List<NodeInfo> moduleList = moduleDao.findAll();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("files",fileList);
        jsonObject.put("nodes",moduleList);

        return responseService.response(CodeStatus.CODE_PUT_SUCCESS, jsonObject,request);
    }


}
