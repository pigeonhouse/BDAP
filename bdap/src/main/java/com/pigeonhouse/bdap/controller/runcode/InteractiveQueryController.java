package com.pigeonhouse.bdap.controller.runcode;

import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.QueryService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/29 10:44
 */
@RestController
public class InteractiveQueryController {

    @Autowired
    LivyDao livyDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    QueryService queryService;


    @RequestMapping("/query/sql")
    public Response sqlQuery(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);

        String sql = request.getParameter("sql");
        String code = "spark.sql(\"" + sql + "\").show()";
        String resultUrl = livyDao.postCode(code, livySessionInfo);

        try {
            String result = queryService.getOutput(resultUrl);
            return new Response(RunningStatus.SUCCESS, result);
        } catch (Exception e) {
            return new Response(RunningStatus.FAIL, null);
        }
    }


    @RequestMapping("/query/readyForData")
    public Response readyForData(HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);
        String userId = tokenService.getValueFromToken(token, "userId").asString();

        String filePath = request.getParameter("filePath");
        String readDataCode = "val df = spark.read.option(\"header\",\"true\").csv(\"hdfs:///bdap/students/" + userId + filePath + "\")\n"
                + "df.createOrReplaceTempView(\"data\")\n"
                + "df.show()";

        String resultUrl = livyDao.postCode(readDataCode, livySessionInfo);

        try {
            String result = queryService.getOutput(resultUrl);
            return new Response(RunningStatus.SUCCESS, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(RunningStatus.FAIL, null);
    }

}
