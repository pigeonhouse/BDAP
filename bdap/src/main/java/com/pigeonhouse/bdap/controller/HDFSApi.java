package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.Hdfsfile;
import com.pigeonhouse.bdap.service.HdfsService;
import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.LinkedHashMap;

/**
 * @Author: Xingtianyu
 * @Date: 2019/9/19 20:38
 */
@RestController
public class HDFSApi {

    @Autowired
    HdfsService hdfsService;

    @PostMapping("/hdfs/getfilelist") //获取文件树函数
    public Object getFileList(@RequestParam(value = "filepath") String Hdfspath) {
        try {
            Hdfsfile fileList = hdfsService.listFiles(Hdfspath, null);
            JSONObject fileListJson = new JSONObject(new LinkedHashMap());
            for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
                JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
                fileListJson.put("fileInfo" + (idx + 1), fileJson);
            }
            return fileListJson;
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", e.toString());
            return errorJson;

        }
    }

    @PostMapping("/hdfs/mkdir")//创建HDFS文件夹函数
    public Object mkdir(@RequestParam(value = "filepath") String Hdfspath) {
        try {
            boolean success = hdfsService.mkdir(Hdfspath);
            if (success) {
                JSONObject successJson = new JSONObject();
                successJson.put("success", "create directory successfully!");
                return successJson;
            } else {
                JSONObject existJson = new JSONObject();
                existJson.put("success", "directory has existed!");
                return existJson;

            }
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", e.toString());
            return errorJson;

        }
    }

    @PostMapping("/hdfs/delete")//创建HDFS文件夹函数
    public Object delete(@RequestParam(value = "filepath") String Hdfspath) {
        try {
            boolean success = hdfsService.delete(Hdfspath);
            if (success) {
                JSONObject successJson = new JSONObject();
                successJson.put("success", "delete directory successfully!");
                return successJson;
            } else {
                JSONObject existJson = new JSONObject();
                existJson.put("success", " file not existed!");
                return existJson;

            }

        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            return errorJson.put("error", e.toString());

        }
    }

    @PostMapping("/hdfs/upload")
    public Object upload(@RequestParam("file") MultipartFile file, @RequestParam("filepath") String dstPath) throws IOException {
        try {
            if (StringUtils.isEmpty(dstPath) || file.getBytes() == null) {
                JSONObject errorJson = new JSONObject();
                errorJson.put("info", "invalid input!");
                return errorJson;
            }
            String returnInfo = (String) hdfsService.upload(file, dstPath);
            JSONObject infoJson = new JSONObject();
            infoJson.put("info", returnInfo);
            return infoJson;
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("info", e.toString());
            return errorJson;

        }

    }


}
