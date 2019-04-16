//package com.bigdataplayground.demo.controller;
//
//import com.alibaba.fastjson.JSONObject;
//import com.bigdataplayground.demo.ModulesPython.executorPython;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class running {
//    @RequestMapping("/run")
//    public String run(@RequestBody JSONObject[] graphInformation){
//        for(JSONObject o :graphInformation){
//            System.out.println(o);
//        }
//        int len = graphInformation.length;
//        nodeCreator nodeArray[] = new nodeCreator[len];
//        for (int i = 0; i < len; i++) {
//            nodeCreator node = new nodeCreator(graphInformation[i].getString("id")
//                    ,graphInformation[i].getString("label")
//                    ,graphInformation[i].getJSONArray("sourceId")
//                    ,graphInformation[i].getJSONObject("attribute")
//                    ,graphInformation[i].getJSONObject("labelArray")
//                    ,"train_demo.csv");
//            nodeArray[i] = node;
//        }
//
//        executorPython executor = new executorPython();
//        executor.execute(nodeArray);
//        return "test";
//    }
//}
