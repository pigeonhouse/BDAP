package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.experimentservice.entity.ExperimentMapInfo;
import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.util.TokenParser;
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

    @PostMapping(value = "/flow/run")
    public ResponseEntity run(@RequestBody ExperimentMapInfo experimentMapInfo,
                              @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);

        ArrayList<NodeInfo> nodes = experimentMapInfo.getNodes();

        return ResponseEntity.ok(executionService.executeFlow(nodes, sessionInfo));
}

    @GetMapping("/flow/node/status")
    public ResponseEntity checkRunningStatus(@RequestParam("resultUrl") String resultUrl,) {
        try {
            Map resultMap = new ObjectMapper().readValue(
                    new RestTemplate().getForObject(resultUrl, String.class), Map.class);
            String state = resultMap.get("state").toString();
            return ResponseEntity.ok(state);
        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
