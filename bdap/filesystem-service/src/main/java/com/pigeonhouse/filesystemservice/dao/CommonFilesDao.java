package com.pigeonhouse.filesystemservice.dao;

import com.pigeonhouse.filesystemservice.entity.MetaData;
import com.pigeonhouse.filesystemservice.util.PathParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.nio.file.attribute.FileAttribute;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class CommonFilesDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Object findCommonFilesByUserId(String userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Map commonFiles = mongoTemplate.findOne(query, Map.class,"commonFiles");
        return commonFiles.get("fileList");
    }

    public void addMetaData(MetaData metaData, String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.push("fileList", metaData);
        mongoTemplate.updateFirst(query, update, "commonFiles");
    }

    public void deleteMetaData(String path, String userId){
        String dirPath = PathParser.getDirPath(path);
        String fileName = PathParser.getName(path);
        List<MetaData> fileList = (List)findCommonFilesByUserId(userId);
        List<MetaData> newFileList = new ArrayList<>();
        for(MetaData metaData : fileList){
            //若删除的是文件夹，则把该文件夹下所有常用文件清除
            if(!metaData.getPath().startsWith(path)) {
                if (!fileName.equals(metaData.getFileName()) || !dirPath.equals(metaData.getPath())) {
                    newFileList.add(metaData);
                }
            }
        }
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.set("fileList",newFileList);
        mongoTemplate.updateFirst(query, update, "commonFiles");
    }
}
