package com.pigeonhouse.filesystemservice.controller;

import com.pigeonhouse.filesystemservice.dao.CommonFilesDao;
import com.pigeonhouse.filesystemservice.entity.MetaData;
import com.pigeonhouse.filesystemservice.entity.HeaderAttribute;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;
import com.pigeonhouse.filesystemservice.service.HdfsService;
import com.pigeonhouse.filesystemservice.service.LivyService;
import com.pigeonhouse.filesystemservice.util.OutputParser;
import com.pigeonhouse.filesystemservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommonFilesController {

    @Autowired
    CommonFilesDao commonFilesDao;
    @Autowired
    LivyService livyService;
    @Autowired
    HdfsService hdfsService;

    @PostMapping("/common-files")
    public ResponseEntity setCommonFiles(@RequestParam("path") String path,
                                         @RequestHeader("token") String token) {
        try {
            LivySessionInfo livySessionInfo = TokenParser.getSessionInfoFromToken(token);
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

            MetaData metaData = hdfsService.getMetaDataFromParquet(userId, path, livySessionInfo);
            commonFilesDao.addMetaData(metaData, userId);
            hdfsService.setCommonFile("/"+userId+path);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
