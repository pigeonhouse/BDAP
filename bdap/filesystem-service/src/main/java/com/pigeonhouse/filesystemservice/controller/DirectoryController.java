package com.pigeonhouse.filesystemservice.controller;

import com.pigeonhouse.filesystemservice.service.HdfsService;
import com.pigeonhouse.filesystemservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DirectoryController {
    @Autowired
    HdfsService hdfsService;

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
