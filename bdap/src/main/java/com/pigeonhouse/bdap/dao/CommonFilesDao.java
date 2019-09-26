package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.prework.CommonFiles;
import com.pigeonhouse.bdap.entity.prework.attributes.FileAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommonFilesDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 查询所有用户的常用文件方法
     *
     * @return List<CommonFiles>
     */
    public List<CommonFiles> findAll() {
        List<CommonFiles> commonFiles = mongoTemplate.find(new Query(new Criteria()), CommonFiles.class);
        return commonFiles;
    }

    /**
     * 按用户名查询列表方法
     *
     * @param userId 用户名
     * @return List<CommonFiles>
     */
    public CommonFiles findByUserId(String userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        CommonFiles commonFiles = mongoTemplate.findOne(query, CommonFiles.class);
        return commonFiles;
    }

    /**
     * 在数据库新增一条用户文档
     *
     * @param commonFiles 用户名
     */
    public void createNewUser(CommonFiles commonFiles) {
        mongoTemplate.insert(commonFiles, "commonFiles");
    }

    /**
     * 在数据库指定用户下增加一个文件
     *
     * @param fileAttribute 文件信息
     * @param userId        用户名
     */
    public void addNewFile(FileAttribute fileAttribute, String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.push("fileList", fileAttribute);
        mongoTemplate.updateFirst(query, update, "commonFiles");
    }

    /**
     * 按文件名查询文件方法
     *
     * @param userId 用户名
     * @return List<CommonFiles>
     */

    public FileAttribute findByFilePath(String filepath, String userId) {
        Query query = new Query(Criteria.where("fileList.fileName").is(filepath).and("userId").is(userId));
        FileAttribute fileAttribute = mongoTemplate.findOne(query, FileAttribute.class);
        return fileAttribute;
    }

}

