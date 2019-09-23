package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.Hdfsfile;
import com.pigeonhouse.bdap.service.HdfsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Xingtianyu
 * @Date: 2019/9/19 20:38
 */
@RestController
public class HDFSApi {
    @Autowired
    HdfsService hdfsService;
    @PostMapping("/hdfs/getfilelist") //获取文件树函数
    public Object getFileList(@RequestParam(value="filepath") String Hdfspath)
    {
        try{
       Hdfsfile fileList= hdfsService.listFiles(Hdfspath,null);
        JSONObject fileListJson = new JSONObject();
        for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
            JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
            fileListJson.put("fileInfo"+(idx+1), fileJson);
        }
        return fileListJson;
    }
        catch (Exception e)
    {
        JSONObject errorJson = new JSONObject();
        errorJson.put("error",e.toString());
        return errorJson;

    }
    }

    @PostMapping("/hdfs/mkdir")//创建HDFS文件夹函数
    public Object mkdir(@RequestParam(value="filepath") String Hdfspath)
    {
        try {
            Object fileList = hdfsService.mkdir(Hdfspath);
            if (fileList instanceof Hdfsfile) {
                JSONObject fileListJson = new JSONObject();
                for (int idx = 0; idx < ((Hdfsfile) fileList).getFilelist().size(); idx++) {
                    JSONObject fileJson = new JSONObject(((Hdfsfile) fileList).getFilelist().get(idx));
                    fileListJson.put("fileInfo" + (idx + 1), fileJson);
                    return fileListJson;
                }
            } else {
                JSONObject errorJson = new JSONObject();
                errorJson.put("exist", fileList.toString());
                return errorJson;

            }
            return null;
        }
        catch (Exception e)
        {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error",e.toString());
            return errorJson;

        }
    }

    @PostMapping("/hdfs/delete")//创建HDFS文件夹函数
    public Object delete(@RequestParam(value="filepath") String Hdfspath) {
        try {
            Hdfsfile fileList = hdfsService.delete(Hdfspath);
            JSONObject fileListJson = new JSONObject();
            for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
                JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
                fileListJson.put("fileInfo" + (idx + 1), fileJson);
            }
            return fileListJson;
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            return errorJson.put("error", e.toString());

        }
    }
}
