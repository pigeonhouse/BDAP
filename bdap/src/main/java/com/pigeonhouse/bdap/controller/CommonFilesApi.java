package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.CommonFiles;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.attributes.FileAttribute;
import com.pigeonhouse.bdap.service.CommonFilesService;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CommonFileStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.LoginStatus;
import com.pigeonhouse.bdap.util.token.PassToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
    FileHeaderAttriService fileHeaderAttriService;

    /**
     * @param userid 用户名称
     * @return 常用数据列表JSON
     */


    @PostMapping("/commonfiles/getcommonfiles")
    public Object getCommonFiles(@RequestParam("userId") String userid) {
        try {
            JSONObject info = new JSONObject();
            CommonFiles commonFiles = commonFilesService.getFileListById(userid);
            if (commonFiles != null) {
                return  new Response(CommonFileStatus.FILE_GET_SUCCESS, commonFilesService.commonFilesToJson(commonFiles));
            } else {
                return  new Response(CommonFileStatus.USER_NOT_FOUND, null);
            }
        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }

    /**
     * 在常用数据表中插入新用户
     *
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
            if(commonFilesService.setNewUser(commonFiles)) {
                return new Response(CommonFileStatus.USER_INSERT_SUCCESS,null);
            }
            else{
                return new Response(CommonFileStatus.USER_HAS_EXISTED,null);
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }


    @PostMapping("/commonFiles/setnewfile")
    @PassToken
    public Object insertNewFile(@RequestParam(value = "userId") String userId, @RequestParam(value = "filePath") String filePath) {
        try {
            JSONObject info = new JSONObject();
            Boolean isExist = commonFilesService.fileExist(filePath, userId);
            if (isExist) {
                new Response(CommonFileStatus.FILE_HAS_EXISTED, null);
            } else {
                CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
                commonFilesService.setNewFile(csvHeader, userId);
                new Response(CommonFileStatus.FILE_INSERT_SUCCESS, null);
                return info;
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return null;
    }

}
