package com.pigeonhouse.bdap.controller.runcode;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.service.runcode.QueryService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.RunningStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 交互式查询API
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
    @Autowired
    ResponseService responseService;



    @RequestMapping("/query/sql")
    public Response sqlQuery(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);

        String sql = request.getParameter("sql");
        String code = "spark.sql(\"" + sql + "\").show()";
        String resultUrl = livyDao.postCode(code, livySessionInfo);

        try {
            String result = queryService.getOutput(resultUrl);
            return responseService.response(RunningStatus.SUCCESS, result,request);
        } catch (Exception e) {
            return responseService.response(RunningStatus.FAIL, null,request);
        }
    }


    @RequestMapping("/query/readyForData")
    public Response readyForData(@RequestBody JSONObject filePathJson, HttpServletRequest request) {

        String token = tokenService.getTokenFromRequest(request, "loginToken");
        LivySessionInfo livySessionInfo = tokenService.getLivySessionInfoFromToken(token);
        String userId = tokenService.getValueFromToken(token, "userId").asString();

        String filePath = filePathJson.getString("filePath");

        String readDataCode = "val df = spark.read.option(\"header\",\"true\").csv(\"hdfs://" + filePath + "\")\n"
                + "df.createOrReplaceTempView(\"data\")\n";

        livyDao.postCode(readDataCode, livySessionInfo);
        String resultUrl = livyDao.postCode("df.show()\n", livySessionInfo);

        try {
            String result = queryService.getOutput(resultUrl);
            return responseService.response(RunningStatus.SUCCESS, result,request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseService.response(RunningStatus.FAIL, null,request);
    }

}
