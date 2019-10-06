package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Author：ZhangJiaYi
 * Time:2019/9/26 17:12
 * 根据ProjectId查询数据库Project对象
 */
@Repository
public class ExperimentDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public MapInfo findExperimentId(String id){
        Query query = new Query(Criteria.where("experimentId").is(id));
        MapInfo experiment = mongoTemplate.findOne(query, MapInfo.class);
        return experiment;
}

}
