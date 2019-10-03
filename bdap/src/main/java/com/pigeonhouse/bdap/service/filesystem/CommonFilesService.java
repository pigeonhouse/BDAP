package com.pigeonhouse.bdap.service.filesystem;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.CommonFilesDao;
import com.pigeonhouse.bdap.entity.metadata.CommonFiles;
import com.pigeonhouse.bdap.entity.metadata.CsvHeader;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;
import com.pigeonhouse.bdap.entity.metadata.HeaderAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public CommonFiles getFileListById(String userId) {
        CommonFiles commonFiles = commonFilesDao.findByUserId(userId);
        if (commonFiles != null) {
            return commonFiles;
        } else {
            return null;
        }
    }

    /**
     * 在数据库中创建新用户的常用文件列表
     */
    public boolean setNewUser(CommonFiles commonFiles) {

        try {

            CommonFiles result = commonFilesDao.findByUserId(commonFiles.getUserId());
            if (result == null) {
                commonFilesDao.createNewUser(commonFiles);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }


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
     * 将类的实例转化为JSON
     */

    public JSONObject commonFilesToJson(CommonFiles commonFiles) {
        JSONObject result = new JSONObject();
        result.put("userId", commonFiles.getUserId());
        result.put("userName", commonFiles.getUserName());
        JSONArray file = new JSONArray();
        for (int FLidx = 0; FLidx < commonFiles.getFileList().size(); FLidx++) {

            JSONObject fileInfo = new JSONObject();
            FileAttribute FA = commonFiles.getFileList().get(FLidx);
            fileInfo.put("fileName", FA.getFileName());
            fileInfo.put("filePath", FA.getFilePath());
            JSONArray colInfo = new JSONArray();
            for (int cols = 0; cols < FA.getFileColumnsInfo().size(); cols++) {
                JSONObject columnInfo = new JSONObject();
                HeaderAttribute HA = FA.getFileColumnsInfo().get(cols);
                columnInfo.put("colName", HA.getColName());
                columnInfo.put("dataType", HA.getDataType());
                colInfo.add(columnInfo);
            }
            fileInfo.put("fileColumnsInfo", colInfo);
            file.add(fileInfo);

        }
        result.put("fileList", file);
        return result;
    }

    /**
     * 判断用户的某一文件是否存在
     */
    public boolean fileExist(String filePath, String userId) {
        FileAttribute fileAttribute = commonFilesDao.findByFilePath(filePath, userId);
        return fileAttribute != null;

    }
}
