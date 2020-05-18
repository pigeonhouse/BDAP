package com.pigeonhouse.experimentservice.controller;

import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.service.LivyService;
import com.pigeonhouse.experimentservice.util.TokenParser;
import jdk.nashorn.internal.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InteractiveQueryController {

    @Autowired
    LivyService livyService;

    @GetMapping("/query/sql")
    //按照前端发回的筛选条件过滤指定数据源
    public ResponseEntity sqlQuery(@RequestParam("sql") String sql,
                                   @RequestHeader("token") String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

        String code = "val df = spark.sql(\"" + sql + "\")";
        livyService.postCode(sessionInfo, code,userId);
        String result = livyService.getCsv(sessionInfo,100);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/query/readyForData")
    //将hdfs中压缩后的orc格式文件取出并进行下载
    public ResponseEntity readyForData(@RequestParam("filePath") String filePath,
                                       @RequestHeader("token")String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        String readDataCode = "val df = spark.read.orc(\"hdfs:///bdap/students/"+ userId + filePath + "\")\n"
                + "df.createOrReplaceTempView(\"data\")\n";

        livyService.postCode(sessionInfo,readDataCode,userId);
        String result = livyService.getCsv(sessionInfo,Integer.MAX_VALUE);
        return ResponseEntity.ok(result);

    }

}
