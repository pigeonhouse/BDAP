package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.LivyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/29 10:44
 */
@RestController
public class Query {

    @Autowired
    LivyService livyService;

    @Autowired
    TokenService tokenService;

    @RequestMapping("/query/ready")
    public void ready(String filepath) {
        LivySessionInfo info = livyService.createSession("10.105.222.90:8998");
        String code = "val df = spark.read.format(\"csv\").option(\"header\",\"true\").load(\"hdfs:///" + filepath + "\")" + "\n"
                + "df.createOrReplaceTempView(\"data\")";

    }

//    @RequestMapping("/query/sql")
//    public void sqlQuery(String sql) {
//        String code = "spark.sql(\"" + sql + "\").show()";
//        livyService.postCode(code, );
//    }


    @RequestMapping("/query/test")
    public void test(HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");

        String livyAddr = tokenService.getValueFromToken(token, "livyAddr").asString();

        int sessionId = tokenService.getValueFromToken(token, "sessionId").asInt();

        System.out.println(livyAddr + "/sessions/" + sessionId);
    }

    @RequestMapping("/query/delete")
    public void delete(String id) {
        livyService.deleteSession(id);
    }

}
