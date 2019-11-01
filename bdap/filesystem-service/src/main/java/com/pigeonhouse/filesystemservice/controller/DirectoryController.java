package com.pigeonhouse.filesystemservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.filesystemservice.dao.CommonFilesDao;
import com.pigeonhouse.filesystemservice.entity.MetaData;
import com.pigeonhouse.filesystemservice.service.HdfsService;
import com.pigeonhouse.filesystemservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class DirectoryController {
    @Autowired
    HdfsService hdfsService;
    @Autowired
    CommonFilesDao commonFilesDao;

    @GetMapping("/ls/common")
    public ResponseEntity commonDir(@RequestHeader("token") String token){
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        List<MetaData> commonFiles = (List<MetaData>)commonFilesDao.findCommonFilesByUserId(userId);
        List<JSONObject> returnJson = new ArrayList<>();
        for(MetaData metaData:commonFiles){
            JSONObject result = new JSONObject();
            result.put("fileName", metaData.getFileName());
            result.put("path", metaData.getPath());
            result.put("isDir", false);
            result.put("isCommonFile", true);
            returnJson.add(result);
        }
        return ResponseEntity.ok(returnJson);
    }

    @GetMapping("/ls")
    public ResponseEntity ls(@RequestParam("path") String path,
                             @RequestHeader("token") String token) {
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        try {
            return ResponseEntity.ok(hdfsService.listFiles("/" + userId + path));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/mkdir")
    public ResponseEntity mkdir(@RequestParam("path") String path,
                                @RequestHeader("token") String token){
        String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
        try {
            System.out.println("/" + userId + path);
            hdfsService.mkdir("/" + userId + path);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
