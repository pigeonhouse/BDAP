package com.pigeonhouse.filesystemservice.controller;

import com.pigeonhouse.filesystemservice.dao.CommonFilesDao;
import com.pigeonhouse.filesystemservice.entity.*;
import com.pigeonhouse.filesystemservice.service.HdfsService;
import com.pigeonhouse.filesystemservice.service.LivyService;
import com.pigeonhouse.filesystemservice.util.TokenParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class HdfsFilesController {

    @Autowired
    HdfsService hdfsService;
    @Autowired
    LivyService livyService;
    @Autowired
    CommonFilesDao commonFilesDao;

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
            hdfsService.upload(file, "/" + userId + "/..tmp");

            String readDataCode = "val df = spark.read.format(\"" + fileType + "\")" +
                    ".option(\"inferSchema\",\"true\").option(\"header\",\"true\")" +
                    ".load(\"hdfs:///bdap/students/" + userId + "/..tmp/" + fileName + "\")\n";

            livyService.postCode(livySessionInfo,readDataCode,userId);
            List<HeaderAttribute> headerAttributes = livyService.getSchema(livySessionInfo);

            String previewData = livyService.getCsv(livySessionInfo,20);

            MetaData metaData = new MetaData(fileName, headerAttributes, previewData);

            return ResponseEntity.ok(metaData);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/file/confirm")
    public ResponseEntity uploadConfirm(@RequestBody ModifiedMetaData modifiedMetaData,
                                        @RequestHeader("token") String token) {
        try {
            StringBuilder codeBuilder = new StringBuilder();
            codeBuilder.append("import org.apache.spark.sql.types.DataTypes\n");
            codeBuilder.append("val modifiedDf = df");
            List<ModifiedHeaderAttribute> modifiedHeaders = modifiedMetaData.getHeaderAttributes();
            for (ModifiedHeaderAttribute headerAttribute : modifiedHeaders) {
                //选中了该列，需要确认是否修改了列名或属性
                if (headerAttribute.isSelected()) {
                    codeBuilder.append(".withColumn(\"").append(headerAttribute.getModifiedColName());
                    codeBuilder.append("\", $\"").append(headerAttribute.getColName()).append("\".cast(DataTypes.");
                    String dataType = headerAttribute.getModifiedDataType();
                    dataType = "Int".equals(dataType) ? "IntegerType" : dataType + "Type";
                    codeBuilder.append(dataType).append("))");
                } else {
                    //未选中，直接drop
                    codeBuilder.append(".drop(\"");
                    System.out.println("drop:" + headerAttribute.getColName());
                    codeBuilder.append(headerAttribute.getColName()).append("\")");
                }
            }
            LivySessionInfo livySessionInfo = TokenParser.getSessionInfoFromToken(token);
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();

            codeBuilder.append("\nmodifiedDf.write.orc(\"hdfs:///bdap/students/");
            codeBuilder.append(userId).append(modifiedMetaData.getPath());
            codeBuilder.append(modifiedMetaData.getModifiedFileName()).append("\")\n");

            livyService.postCode(livySessionInfo, codeBuilder.toString(),userId);

            String sessionStatus = "";
            while (!"idle".equals(sessionStatus)) {
                sessionStatus = livyService.sessionStatus(livySessionInfo);
                Thread.sleep(500);
            }
            hdfsService.delete("/" + userId + "/..tmp/" + modifiedMetaData.getFileName());
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity delete(@RequestParam("path") String path,
                                 @RequestHeader("token") String token){
        try{
            String userId = TokenParser.getClaimsFromToken(token).get("userId").asString();
            hdfsService.delete("/" + userId + path);
            commonFilesDao.deleteMetaData(path,userId);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}


