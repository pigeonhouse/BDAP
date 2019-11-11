package com.pigeonhouse.experimentservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.experimentservice.dao.ModuleDao;
import com.pigeonhouse.experimentservice.dao.SavedModelDao;
import com.pigeonhouse.experimentservice.entity.SavedModel;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import com.pigeonhouse.experimentservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ModuleController {

    @Autowired
    ModuleDao moduleDao;
    @Autowired
    SavedModelDao savedModelDao;

    @GetMapping("/module")
    public ResponseEntity moduleInfo() {
        List<NodeInfo> moduleList = moduleDao.findAll();
        return ResponseEntity.ok(moduleList);
    }

    @GetMapping("/model")
    public ResponseEntity model(@RequestHeader("token") String token){
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        return ResponseEntity.ok(savedModelDao.findModelsByUserId(userId));
    }
}
