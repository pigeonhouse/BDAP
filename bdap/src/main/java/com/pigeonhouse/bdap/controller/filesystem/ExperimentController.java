package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.Experiment;
import com.pigeonhouse.bdap.service.filesystem.ExperimentService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.ExperimentStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.HdfsStatus;
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
    ExperimentService projectService;
    /**
     *
     * */
    @PostMapping("/experiment/load")

    public Object getFileList(@RequestParam("experimentId") String experimentId) {
        try {
            Experiment experiment = projectService.findExperimentId(experimentId);
            if(experiment==null)
            {
                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_ERROR, null);
            }
            else{
                JSONObject JSONobject = projectService.experimentToJson(experiment);
                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, JSONobject);
            }
        }
        catch(Exception e)
        {
            return new Response(ExperimentStatus.BACKEND_ERROR, e.toString());

        }
    }
}
