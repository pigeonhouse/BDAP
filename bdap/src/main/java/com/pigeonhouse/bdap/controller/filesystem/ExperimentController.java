package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import com.pigeonhouse.bdap.service.filesystem.ExperimentService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.ExperimentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author：ZhangJiaYi
 * Time:2019/9/27 9:07
 */
@RestController
public class ExperimentController {
    @Autowired
    ExperimentService experimentService;
    /**
     *
     * */
    @PostMapping("/experiment/load")

    public Object getFileList(@RequestParam("experimentId") String experimentId) {
        try {
            MapInfo experiment = experimentService.findExperimentId(experimentId);
            if(experiment==null)
            {
                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_ERROR, null);
            }
            else{
                JSONObject JSONobject = experimentService.experimentToJson(experiment);
                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, JSONobject);
            }
        }
        catch(Exception e)
        {
            return new Response(ExperimentStatus.BACKEND_ERROR, e.toString());

        }
    }
}
