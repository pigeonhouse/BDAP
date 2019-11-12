package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.pigeonhouse.experimentservice.dao.ExperimentDao;
import com.pigeonhouse.experimentservice.entity.SavedModel;
import com.pigeonhouse.experimentservice.entity.edgeinfo.EdgeInfo;
import com.pigeonhouse.experimentservice.entity.experiment.ExperimentDescription;
import com.pigeonhouse.experimentservice.entity.experiment.ExperimentMapInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.AlgorithmNodeInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.DataSourceNodeInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.SavedModelNodeInfo;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
public class StorageController {

    @Autowired
    ExperimentDao experimentDao;

    @GetMapping("/experiments/description")
    public ResponseEntity getAllExperimentsDescription(@RequestHeader("token") String token) {
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        List<ExperimentDescription> allExperiments = experimentDao.findExperimentDescriptionByUserId(userId);
        return ResponseEntity.ok(allExperiments);
    }


    @GetMapping("/experiments/{experimentId}")
    public ResponseEntity getExperimentByExperimentId(@PathVariable String experimentId,
                                                      @RequestHeader("token") String token) {
        try {
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
            ExperimentMapInfo experiment = experimentDao.findExperimentByExperimentIdAndUserId(experimentId, userId);
            return ResponseEntity.ok(experiment);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/experiments/{experimentId}")
    public ResponseEntity deleteExperimentByExperimentId(@PathVariable String experimentId,
                                                         @RequestHeader("token") String token) {
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        experimentDao.deleteExperimentByExperimentIdAndUserId(experimentId, userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/experiments")
    public ResponseEntity uploadNewExperiment(@RequestBody JSONObject descriptionAndMapInfo,
                                              @RequestHeader("token") String token) {
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        JSONObject experimentMapInfoJson = descriptionAndMapInfo.getJSONObject("experiment");
        ExperimentDescription experimentDescription = JSON.toJavaObject(descriptionAndMapInfo.getJSONObject("description"), ExperimentDescription.class);
        JSONArray edgesJson = experimentMapInfoJson.getJSONArray("edges");
        ArrayList<EdgeInfo> edges = new ArrayList<>();
        for (int i = 0; i < edgesJson.size(); i++) {
            edges.add(JSON.toJavaObject((JSONObject)edgesJson.get(i),EdgeInfo.class));
        }
        JSONArray nodes = experimentMapInfoJson.getJSONArray("nodes");
        ArrayList<NodeInfo> nodeInfos = new ArrayList<>();

        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject)nodes.get(i);
            JSONObject groupName = (JSONObject)node.get("groupName");
            String type = groupName.get("elabel").toString();
            if("datasource".equals(type)){
                nodeInfos.add(JSON.toJavaObject(node,DataSourceNodeInfo.class));
            }else if("savedModel".equals(type)){
                nodeInfos.add(JSON.toJavaObject(node, SavedModelNodeInfo.class));
            }else{
                nodeInfos.add(JSON.toJavaObject(node, AlgorithmNodeInfo.class));
            }
        }
        System.out.println(nodeInfos);
        ExperimentMapInfo experimentMapInfo = new ExperimentMapInfo(experimentDescription.getExperimentId(), userId,nodeInfos,edges);
        String experimentId = experimentDescription.getExperimentId();
        experimentMapInfo.setExperimentId(experimentId);

        experimentDescription.setUserId(userId);
        experimentMapInfo.setUserId(userId);

        ExperimentMapInfo experiment = experimentDao.findExperimentByExperimentIdAndUserId(experimentId, userId);
        if(experiment == null){
            experimentMapInfo.setUserId(userId);
            experimentDao.saveExperiment(experimentMapInfo);
            experimentDao.saveDescription(experimentDescription);
        }else{
            experimentDao.updateExperimentByExperimentIdAndUserId(experimentId, userId, experimentMapInfo);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
