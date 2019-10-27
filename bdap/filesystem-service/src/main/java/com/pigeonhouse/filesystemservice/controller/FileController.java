package com.pigeonhouse.filesystemservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@RestController
public class FileController {

    @Autowired
    HdfsService hdfsService;
    @Autowired
    LivyService livyService;

    @PostMapping("/file")
    public ResponseEntity upload(HttpServletRequest request) {
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
            LivySessionInfo livySessionInfo = TokenParser.getSessionInfoFromRequest(request);
            String userId = TokenParser.getClaimsFromRequest(request).get("userId").asString();

            MultipartFile file = multipartRequest.getFile("file");
            String fileName = file.getOriginalFilename();
            String[] splits = fileName.split("\\.");
            String fileType = splits[splits.length - 1];

            if (!"csv".equals(fileType) && !"txt".equals(fileType) && !"json".equals(fileType)) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
            hdfsService.upload(file, "/" + userId + "/tmp");

            String readDataCode = "val df = spark.read.format(\"" + fileType + "\")" +
                    ".option(\"inferSchema\",\"true\").option(\"header\",\"true\")" +
                    ".load(\"hdfs:///bdap/students/" + userId + "/tmp/" + fileName + "\")";

            livyService.postCode(livySessionInfo,readDataCode);

            String readSchemaDDL = "println(df.schema.toDDL)";

            String schemaResultUrl = livyService.postCode(livySessionInfo,readSchemaDDL);

            String schemaDDL = OutputParser.getOutput(schemaResultUrl);

            String previewDataCode = "df.show(10,false)";
            String previewDataResultUrl = livyService.postCode(livySessionInfo,previewDataCode);

            String previewData = OutputParser.convertToCsv(OutputParser.getOutput(previewDataResultUrl));

            ArrayList<HeaderAttribute> headerAttributes = new ArrayList<>();
            String[] ddlSplits = schemaDDL.split(",");
            for (int i = 0; i < ddlSplits.length; i++) {
                String[] nameAndType = ddlSplits[i].split("\\s");
                String name = nameAndType[0].replace("`", "");
                String typeLowerCase = nameAndType[1].toLowerCase();
                String type = typeLowerCase.substring(0, 1).toUpperCase() + typeLowerCase.substring(1);
                headerAttributes.add(new HeaderAttribute(name, type));
            }

            JSONObject schemaAndData = new JSONObject();
            schemaAndData.put("metaData", headerAttributes);
            schemaAndData.put("previewData", previewData);

            return ResponseEntity.ok(schemaAndData);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}


