package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/9 11:26
 */
@Service
public class ResponseService {
    @Autowired
    TokenService tokenService;
    public Response response(Status status, Object data, HttpServletRequest request){
        Response res = new Response();
        res.setCode(status.getCode());
        res.setMessage(status.getMessage());
        if (request != null) {
            String oldToken = tokenService.getTokenFromRequest(request, "loginToken");
            res.setToken(tokenService.refreshToken(oldToken));
        }
        res.setData(data);
        return res;
    }
}
