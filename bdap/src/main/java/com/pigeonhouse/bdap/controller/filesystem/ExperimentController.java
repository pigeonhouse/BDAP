//package com.pigeonhouse.bdap.controller.filesystem;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONObject;
//import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
//import com.pigeonhouse.bdap.service.filesystem.ExperimentService;
//import com.pigeonhouse.bdap.util.response.Response;
//import com.pigeonhouse.bdap.util.response.statusimpl.ExperimentStatus;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpServletRequest;
//
///**
// * Author：ZhangJiaYi
// * Time:2019/9/27 9:07
// */
//@RestController
//public class ExperimentController {
//    @Autowired
//    ExperimentService experimentService;
//    /**
//     *
//     * */
//    @PostMapping("/experiment/load")
//
//    public Object getFileList(String experimentId, HttpServletRequest request) {
//        try {
//            MapInfo experiment = experimentService.findExperimentId(experimentId);
//            if(experiment==null)
//            {
//                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_ERROR, null,request);
//            }
//            else{
//                return new Response(ExperimentStatus.EXPERIMENT_SEARCH_SUCCESS, JSON.toJSON(experiment),request);
//            }
//        }
//        catch(Exception e)
//        {
//            return new Response(ExperimentStatus.BACKEND_ERROR, e.toString(),request);
//
//        }
//    }
//}
