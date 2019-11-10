package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.experimentservice.dao.ExperimentDao;
import com.pigeonhouse.experimentservice.entity.ExperimentDescription;
import com.pigeonhouse.experimentservice.entity.ExperimentMapInfo;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

//    @PutMapping("/experiments/{experimentId}")
//    public ResponseEntity updateExperiment(@RequestBody ExperimentMapInfo experimentMapInfo,
//                                           @PathVariable String experimentId,
//                                           @RequestHeader("token") String token) {
//        System.out.println("update");
//        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
//        experimentDao.updateExperimentByExperimentIdAndUserId(experimentId, userId, experimentMapInfo);
//        return new ResponseEntity(HttpStatus.OK);
//    }

    @PutMapping("/experiments")
    public ResponseEntity uploadNewExperiment(@RequestBody JSONObject descriptionAndMapInfo,
                                              @RequestHeader("token") String token) {
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        ExperimentMapInfo experimentMapInfo = JSON.toJavaObject(descriptionAndMapInfo.getJSONObject("experiment"), ExperimentMapInfo.class);

        ExperimentDescription experimentDescription = JSON.toJavaObject(descriptionAndMapInfo.getJSONObject("description"), ExperimentDescription.class);
        String experimentId = experimentDescription.getExperimentId();
        experimentMapInfo.setExperimentId(experimentId);

        experimentDescription.setUserId(userId);
        experimentMapInfo.setUserId(userId);

        ExperimentMapInfo experiment = experimentDao.findExperimentByExperimentIdAndUserId(experimentId, userId);
        if(experiment == null){
            experimentMapInfo.setUserId(userId);
            experimentDao.insertExperiment(experimentMapInfo);
            experimentDao.insertDescription(experimentDescription);
        }else{
            experimentDao.updateExperimentByExperimentIdAndUserId(experimentId, userId, experimentMapInfo);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
