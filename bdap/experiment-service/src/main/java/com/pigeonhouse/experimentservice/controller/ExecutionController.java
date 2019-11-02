package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.experimentservice.entity.ExperimentMapInfo;
import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.service.ExecutionService;
import com.pigeonhouse.experimentservice.service.LivyService;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

@RestController
public class ExecutionController {

    @Autowired
    ExecutionService executionService;
    @Autowired
    LivyService livyService;

    @PostMapping("/flow/run")
    public ResponseEntity run(@RequestBody ExperimentMapInfo experimentMapInfo,
                              @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

        ArrayList<NodeInfo> nodes = experimentMapInfo.getNodes();

        return ResponseEntity.ok(executionService.executeFlow(nodes, sessionInfo,userId));
    }

    @GetMapping("/flow/node/status")
    public ResponseEntity checkRunningStatus(@RequestParam("resultUrl") String resultUrl) {
        try {
            Map resultMap = new ObjectMapper().readValue(
                    new RestTemplate().getForObject(resultUrl, String.class), Map.class);
            String state = resultMap.get("state").toString();
            return ResponseEntity.ok(state);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/flow/node/data/{nodeId}")
    public ResponseEntity showNodeResult(@PathVariable String nodeId,
                                         @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        livyService.postCode(sessionInfo, "val df = dfMap(\"" + nodeId + "\")\n");
        String result = livyService.getCsv(sessionInfo, 100);
        return ResponseEntity.ok(result);

    }

    @GetMapping("/session/status")
    public ResponseEntity sessionStatus(@RequestHeader("token") String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String status = livyService.sessionStatus(sessionInfo);
        return ResponseEntity.ok(status);
    }

}
