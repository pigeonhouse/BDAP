package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.*;
import com.pigeonhouse.bdap.entity.prework.CommonFiles;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.attributes.FileAttribute;
import com.pigeonhouse.bdap.service.CommonFilesService;

import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * @Author XingTianYu
 * @date 2019/9/24 20:32
 */
@RestController
public class CommonFilesApi {
    @Autowired
    CommonFilesService commonFilesService;
    @Autowired
    FileHeaderAttriService  fileHeaderAttriService;
    /**
     * @param userid 用户名称
     * @return 常用数据列表JSON
     */


    @PostMapping("/commonfiles/getcommonfiles")
    public Object getCommonFiles(@RequestParam("userId") String userid) {
        try {
             JSONObject info=new JSONObject();
            CommonFiles commonFiles = commonFilesService.getFileListById(userid);
            if(commonFiles!=null)
            {
                return commonFilesService.commonFilesToJson(commonFiles);
            }
            else
            {
                info.put("info","not found!");
                return info;
            }
        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }

    /**
     * 在常用数据表中插入新用户
     * @param userId   用户ID
     * @param userName 用户名称
     * @return 错误提示信息或插入成功通知
     */
    @PostMapping("/commonFiles/setnewuser")
    public Object insertNewUser(@RequestParam(value = "userId") String userId, @RequestParam(value = "userName") String userName) {
        try {
            JSONObject info = new JSONObject();
            CommonFiles commonFiles = new CommonFiles();
            commonFiles.setUserId(userId);
            commonFiles.setUserName(userName);
            commonFiles.setFileList(new ArrayList<FileAttribute>());
            JSONObject isSuccess = commonFilesService.setNewUser(commonFiles);
            return isSuccess;

        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }

    @PostMapping("/commonFiles/setnewfile")
    public Object insertNewFile(@RequestParam(value = "userId") String userId, @RequestParam(value = "filepath") String filepath) {
        try {
            JSONObject info = new JSONObject();
            CommonFiles commonFiles = commonFilesService.getFileListById(userId);
            CsvHeader csvHeader=fileHeaderAttriService.findByFilePath(filepath);
            commonFilesService.setNewFile(csvHeader,userId);
            info.put("info","加入文件成功!");

        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }

}
