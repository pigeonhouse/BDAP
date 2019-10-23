package com.pigeonhouse.bdap.service.filesystem;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.config.HdfsConfig;
import com.pigeonhouse.bdap.dao.CommonFilesDao;
import com.pigeonhouse.bdap.entity.metadata.CommonFiles;
import com.pigeonhouse.bdap.entity.metadata.CsvHeader;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;
import com.pigeonhouse.bdap.entity.metadata.HeaderAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @Author XingTianYu
 * @date 2019/9/24 16:58
 */
@Service
public class CommonFilesService {
    @Autowired
    CommonFilesDao commonFilesDao;

    /**
     * 按用户Id获取常用文件列表
     * 返回:CommonFiles 对象
     */
    public ArrayList<FileAttribute> getFileListById(String userId) {
        return commonFilesDao.findByUserId(userId);

    }

    /**
     * 在数据库中创建新用户的常用文件列表
     */
//    public boolean setNewUser(CommonFiles commonFiles) {
//
//        try {
//            CommonFiles result = commonFilesDao.findByUserId(commonFiles.getUserId());
//            if (result == null) {
//                commonFilesDao.createNewUser(commonFiles);
//                return true;
//            } else {
//                return false;
//            }
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//        return false;
//    }


    /**
     * 在已有用户中添加一个新文件
     */
    public void setNewFile(CsvHeader csvHeader, String userId) {
        FileAttribute fileAttribute = new FileAttribute();
        fileAttribute.setFileName(csvHeader.getFileName());
        fileAttribute.setFilePath(csvHeader.getFilePath());
        fileAttribute.setFileColumnsInfo(csvHeader.getAttrHeaderSet());
        commonFilesDao.addNewFile(fileAttribute, userId);
    }
/**
* 在常用文件数据库中删除某个文件的信息
* */
    public void deleteFile(String userId,String oppositePath) {
        HdfsConfig hdfsConfig=new HdfsConfig();
        commonFilesDao.deleteFile(userId,hdfsConfig.getDefaultDirectory()+"/"+userId+oppositePath);
    }


    /**
     * 判断用户的某一文件是否存在
     */
    public boolean fileExist(String oppositePath, String userId) {
        HdfsConfig hdfsConfig=new HdfsConfig();
        CommonFiles fileAttribute = commonFilesDao.findByFilePath(hdfsConfig.getDefaultDirectory()+"/"+userId+oppositePath, userId);
        return fileAttribute != null;
    }
}
