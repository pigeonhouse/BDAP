package com.pigeonhouse.filesystemservice.dao;

import com.pigeonhouse.filesystemservice.entity.MetaData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.nio.file.attribute.FileAttribute;

@Repository
public class CommonFilesDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void addMetaData(MetaData metaData, String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.push("fileList", metaData);
        mongoTemplate.updateFirst(query, update, "commonFiles");
    }
}
