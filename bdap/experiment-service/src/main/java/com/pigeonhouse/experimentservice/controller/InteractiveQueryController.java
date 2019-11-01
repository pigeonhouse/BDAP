package com.pigeonhouse.experimentservice.controller;

import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.service.LivyService;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InteractiveQueryController {

    @Autowired
    LivyService livyService;

    @RequestMapping("/query/sql")
    public ResponseEntity sqlQuery(@RequestParam("sql") String sql,
                                   @RequestHeader("token") String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);

        String code = "val df = spark.sql(\"" + sql + "\")";
        livyService.postCode(sessionInfo, code);
        String result = livyService.getCsv(sessionInfo,100);
        return ResponseEntity.ok(result);
    }


    @RequestMapping("/query/readyForData")
    public ResponseEntity readyForData(@RequestParam("filePath") String filePath,
                                       @RequestHeader("token")String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);

        String readDataCode = "val df = spark.read.orc(\"hdfs://" + filePath + "\")\n"
                + "df.createOrReplaceTempView(\"data\")\n";

        livyService.postCode(sessionInfo,readDataCode);
        String result = livyService.getCsv(sessionInfo,100);
        return ResponseEntity.ok(result);

    }

}
