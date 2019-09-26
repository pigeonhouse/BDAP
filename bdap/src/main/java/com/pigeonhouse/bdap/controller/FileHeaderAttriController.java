package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import org.apache.avro.data.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileHeaderAttriController {

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    @PostMapping("/csvHeader")
    public String getCsvHeader(@RequestParam("fileId") String filePath){

        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
        return JSONObject.toJSONString(csvHeader);
    }
}
