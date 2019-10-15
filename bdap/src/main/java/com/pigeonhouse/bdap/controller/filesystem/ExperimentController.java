package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.ExperimentDao;
import com.pigeonhouse.bdap.entity.mapinfo.ExperimentDescription;
import com.pigeonhouse.bdap.entity.mapinfo.ExperimentMapInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.ExperimentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

/**
 * 用户实验操作相关API
 * Author：ZhangJiaYi
 * Time:2019/9/27 9:07
 */
@RestController
public class ExperimentController {
    @Autowired
    ExperimentDao experimentDao;
    @Autowired
    ResponseService responseService;
    @Autowired
    TokenService tokenService;


    @GetMapping("/experiments/description")
    public Response getAllExperimentsDescription(HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();
        List<ExperimentDescription> allExperiments = experimentDao.findExperimentDescriptionByUserId(userId);
        return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, allExperiments, request);
    }


    @GetMapping("/experiments/{experimentId}")
    public Object getExperimentByExperimentId(@PathVariable String experimentId, HttpServletRequest request) {
        try {
            String token = tokenService.getTokenFromRequest(request, "loginToken");
            String userId = tokenService.getValueFromToken(token, "userId").asString();
            ExperimentMapInfo experiment = experimentDao.findExperimentByExperimentIdAndUserId(experimentId, userId);
            if (experiment == null) {
                return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_ERROR, null, request);
            } else {
                return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, JSON.toJSON(experiment), request);
            }
        } catch (Exception e) {
            return responseService.response(ExperimentStatus.BACKEND_ERROR, e.toString(), request);
        }
    }

    @DeleteMapping("/experiments/{experimentId}")
    public Response deleteExperimentByExperimentId(@PathVariable String experimentId, HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();
        experimentDao.deleteExperimentByExperimentIdAndUserId(experimentId, userId);
        return responseService.response(ExperimentStatus.EXPERIMENT_DELETE_SUCCESS, null, request);
    }

    @PutMapping("/experiments/{experimentId}")
    public Response updateExperiment(@RequestBody ExperimentMapInfo experimentMapInfo,
                                      @PathVariable String experimentId, HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();
        experimentDao.updateExperimentByExperimentIdAndUserId(experimentId, userId, experimentMapInfo);
        return responseService.response(ExperimentStatus.EXPERIMENT_UPDATE_SUCCESS, null, request);
    }

    @PutMapping("/experiments")
    public Response uploadNewExperiment(@RequestBody JSONObject descriptionAndMapInfo, HttpServletRequest request) {
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token, "userId").asString();

        ExperimentMapInfo experimentMapInfo = JSON.toJavaObject(descriptionAndMapInfo.getJSONObject("experiment"), ExperimentMapInfo.class);

        ExperimentDescription experimentDescription = JSON.toJavaObject(descriptionAndMapInfo.getJSONObject("description"), ExperimentDescription.class);
        String experimentId = UUID.randomUUID().toString().replaceAll("-", "");

        experimentMapInfo.setUserId(userId);
        experimentMapInfo.setExperimentId(experimentId);

        experimentDescription.setUserId(userId);
        experimentDescription.setExperimentId(experimentId);

        experimentDao.insertExperiment(experimentMapInfo);
        experimentDao.insertDescription(experimentDescription);
        return responseService.response(ExperimentStatus.EXPERIMENT_SAVE_SUCCESS, experimentId, request);


    }


}
