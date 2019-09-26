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

    /**
     * 请求CSV文件字段信息
     * @param filePath 文件路径
     * @return 文件字段信息
     */
    @PostMapping("/csvHeader")
    public String getCsvHeader(@RequestParam("filePath") String filePath){
        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
        return JSONObject.toJSONString(csvHeader);
    }
}
