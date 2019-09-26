package com.pigeonhouse.bdap.dao;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.CommonFiles;
import com.pigeonhouse.bdap.entity.prework.attributes.FileAttribute;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class CommonFilesDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 查询所有用户的常用文件方法
     * @return List<CommonFiles>
     */
    public List<CommonFiles> findAll(){
        List<CommonFiles> commonFiles = mongoTemplate.find(new Query(new Criteria()), CommonFiles.class);
        return commonFiles;
    }

    /**
     * 按用户名查询文件方法
     * @param userId 用户名
     * @return List<CommonFiles>
     */
    public CommonFiles findByUserId(String userId){
        Query query=new Query(Criteria.where("userId").is(userId));
        CommonFiles commonFiles = mongoTemplate.findOne(query, CommonFiles.class);
        return commonFiles;
    }
    /**
     * 在数据库新增一条文档
     * @param commonFiles 用户名
     */
    public void createNewUser(CommonFiles commonFiles){
        mongoTemplate.insert(commonFiles,"commonFiles");
    }
    public void updateFileList(FileAttribute fileAttribute,String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.push("fileList",fileAttribute);
        mongoTemplate.updateFirst(query, update,"commonFiles");


    }

    /**
     * 将文件类转化为JSON对象
     * @param commonFiles
     * @return JSONObject
     */

}
