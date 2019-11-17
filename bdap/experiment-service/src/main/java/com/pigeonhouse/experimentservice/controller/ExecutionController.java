package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigeonhouse.experimentservice.dao.SavedModelDao;
import com.pigeonhouse.experimentservice.entity.experiment.ExperimentMapInfo;
import com.pigeonhouse.experimentservice.entity.LivySessionInfo;
import com.pigeonhouse.experimentservice.entity.SavedModel;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.service.ExecutionService;
import com.pigeonhouse.experimentservice.service.LivyService;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Map;

@RestController
public class ExecutionController {

    @Autowired
    ExecutionService executionService;
    @Autowired
    LivyService livyService;
    @Autowired
    SavedModelDao savedModelDao;

    @PostMapping("/flow/run")
    public ResponseEntity run(@RequestBody JSONObject nodesJson,
                              @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        System.out.println(nodesJson);
        JSONArray nodes = nodesJson.getJSONArray("nodes");
        return ResponseEntity.ok(executionService.executeFlow(nodes, sessionInfo, userId));
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
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

        livyService.postCode(sessionInfo, "val df = dfMap(\"" + nodeId + "\")\n", userId);
        String result = livyService.getCsv(sessionInfo, Integer.MAX_VALUE);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/flow/node/model/{nodeId}")
    public ResponseEntity saveModel(@PathVariable String nodeId,
                                    @RequestBody SavedModel model,
                                    @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        model.setUserId(userId);
        savedModelDao.saveModel(model);
        livyService.postCode(sessionInfo, "val model: " + model.getElabel() +"Model = modelMap(\"" + nodeId + "_0\")._2.asInstanceOf["+model.getElabel()+"Model]\n" +
                "model.save(\"hdfs:///bdap/students/" + userId + "/savedModels/" + model.getModelId() + "\")", userId);
        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/flow/node/evaluation/{nodeId}")
    public ResponseEntity showEvaluationResult(@PathVariable String nodeId,
                                               @RequestHeader("token") String token) {

        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

        livyService.postCode(sessionInfo, "val evaluationResult = evaluationMap(\"" + nodeId + "\")\n", userId);
        String result = livyService.getEvaluationResult(sessionInfo);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/session/status")
    public ResponseEntity sessionStatus(@RequestHeader("token") String token) {
        LivySessionInfo sessionInfo = TokenParser.getSessionInfoFromToken(token);
        String status = livyService.sessionStatus(sessionInfo);
        return ResponseEntity.ok(status);
    }

}
