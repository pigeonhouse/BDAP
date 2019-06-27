package com.pigeonhouse.bdap.controller;

import com.pigeonhouse.bdap.service.impl.Processor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/25 18:14
 */

@CrossOrigin(origins="*")
@RestController
public class CheckPassword {
    @Autowired
    private Processor processor;

    @RequestMapping("/check")
    public Boolean check(HttpServletRequest request){
        int id = Integer.valueOf(request.getParameter("id"));
        String password = request.getParameter("password");
        return processor.checkPassword(id,password);
    }

}
