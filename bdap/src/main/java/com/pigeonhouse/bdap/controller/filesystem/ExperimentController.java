package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSON;
import com.pigeonhouse.bdap.dao.ExperimentDao;
import com.pigeonhouse.bdap.entity.mapinfo.ExperimentMapInfo;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.TokenService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.ExperimentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

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


    @GetMapping("/experiments/all")
    public Response getAllExperiment(HttpServletRequest request){
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token,"userId").asString();
        System.out.println(userId);
        List<ExperimentMapInfo> allExperiments = experimentDao.findExperimentByUserId(userId);
        System.out.println(allExperiments);
        return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, allExperiments, request);
    }

    /**
     *
     */
    @GetMapping("/experiments/{experimentId}")
    public Object getExperimentByExperimentId(@PathVariable String experimentId, HttpServletRequest request) {
        try {
            String token = tokenService.getTokenFromRequest(request, "loginToken");
            String userId = tokenService.getValueFromToken(token,"userId").asString();
            ExperimentMapInfo experiment = experimentDao.findExperimentByExperimentId(experimentId,userId);
            if (experiment == null) {
                return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_ERROR, null, request);
            } else {
                return responseService.response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, JSON.toJSON(experiment), request);
            }
        } catch (Exception e) {
            return responseService.response(ExperimentStatus.BACKEND_ERROR, e.toString(), request);
        }
    }

    @PostMapping("/experiments")
    public Response uploadExperiment(@RequestBody ExperimentMapInfo experiment, HttpServletRequest request){
        String token = tokenService.getTokenFromRequest(request, "loginToken");
        String userId = tokenService.getValueFromToken(token,"userId").asString();
        experiment.setUserId(userId);
        experimentDao.insertExperiment(experiment);
        return responseService.response(ExperimentStatus.EXPERIMENT_SAVE_SUCCESS, experiment, request);
    }


}
