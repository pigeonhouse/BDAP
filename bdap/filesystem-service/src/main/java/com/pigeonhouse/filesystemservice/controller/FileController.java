package com.pigeonhouse.filesystemservice.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.pigeonhouse.filesystemservice.entity.FileMetaData;
import com.pigeonhouse.filesystemservice.entity.HeaderAttribute;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;
import com.pigeonhouse.filesystemservice.service.HdfsService;
import com.pigeonhouse.filesystemservice.service.LivyService;
import com.pigeonhouse.filesystemservice.util.OutputParser;
import com.pigeonhouse.filesystemservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class FileController {

    @Autowired
    HdfsService hdfsService;
    @Autowired
    LivyService livyService;

    @PostMapping("/file")
    public ResponseEntity upload(HttpServletRequest request,
                                 @RequestHeader("token") String token) {
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            LivySessionInfo livySessionInfo = TokenParser.getSessionInfoFromToken(token);
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

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

            livyService.postCode(livySessionInfo, readDataCode);

            String readSchemaDDL = "println(df.schema.toDDL)";

            String schemaResultUrl = livyService.postCode(livySessionInfo, readSchemaDDL);

            String schemaDDL = OutputParser.getOutput(schemaResultUrl);

            String previewDataCode = "df.show(10,false)";
            String previewDataResultUrl = livyService.postCode(livySessionInfo, previewDataCode);

            String previewData = OutputParser.convertToCsv(OutputParser.getOutput(previewDataResultUrl));

            ArrayList<HeaderAttribute> headerAttributes = new ArrayList<>();
            String[] ddlSplits = schemaDDL.split(",");
            for (String ddl : ddlSplits) {
                String[] nameAndType = ddl.split("\\s");
                String name = nameAndType[0].replace("`", "");
                String typeLowerCase = nameAndType[1].toLowerCase();
                String type = typeLowerCase.substring(0, 1).toUpperCase() + typeLowerCase.substring(1);
                headerAttributes.add(new HeaderAttribute(name, type));
            }
            FileMetaData fileMetaData = new FileMetaData();
            fileMetaData.setHeaderAttributes(headerAttributes);
            fileMetaData.setFileName(fileName);
            fileMetaData.setPreviewData(previewData);

            return ResponseEntity.ok(fileMetaData);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/file/confirm")
    public ResponseEntity uploadConfirm(@RequestBody FileMetaData modifiedMetaData
            , @RequestHeader("token") String token) {
        try {
            StringBuilder codeBuilder = new StringBuilder();
            codeBuilder.append("import org.apache.spark.sql.types.DataTypes\n");
            codeBuilder.append("val modifiedDf = df");
            List<HeaderAttribute> modifiedHeaders = modifiedMetaData.getHeaderAttributes();
            for (HeaderAttribute headerAttribute : modifiedHeaders) {
                //选中了，需要确认是否修改了列名或属性
                if (headerAttribute.isSelected()) {
                    codeBuilder.append(".withColumn(\"").append(headerAttribute.getModifiedColName());
                    codeBuilder.append("\", $\"").append(headerAttribute.getColName());
                    codeBuilder.append("\".cast(DataTypes.");
                    String dataType = headerAttribute.getModifiedDataType();
                    System.out.println(dataType);
                    if ("Int".equals(dataType)) {
                        dataType = "IntegerType";
                    } else {
                        dataType += "Type";
                    }
                    codeBuilder.append(dataType);
                    codeBuilder.append("))");
                } else {
                    //未选中，直接drop
                    codeBuilder.append(".drop(\"");
                    System.out.println("drop:"+headerAttribute.getColName());
                    codeBuilder.append(headerAttribute.getColName());
                    codeBuilder.append("\")");
                }
            }
            LivySessionInfo livySessionInfo = TokenParser.getSessionInfoFromToken(token);
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

            codeBuilder.append("\nmodifiedDf.write.parquet(\"hdfs:///bdap/students/");
            codeBuilder.append(userId).append(modifiedMetaData.getPath());
            codeBuilder.append(modifiedMetaData.getModifiedFileName());
            codeBuilder.append("\")\n");

            livyService.postCode(livySessionInfo, codeBuilder.toString());

            System.out.println("pushed");

            String sessionStatus = "";
            while (!"idle".equals(sessionStatus)) {
                sessionStatus = livyService.sessionStatus(livySessionInfo);
                Thread.sleep(500);
            }
            hdfsService.delete("/" + userId + "/tmp/" + modifiedMetaData.getFileName());
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

}


