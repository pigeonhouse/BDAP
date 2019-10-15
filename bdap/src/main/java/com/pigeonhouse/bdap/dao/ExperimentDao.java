package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.mapinfo.ExperimentMapInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Author：ZhangJiaYi
 * Time:2019/9/26 17:12
 */
@Repository
public class ExperimentDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ExperimentMapInfo> findExperimentByUserId(String userId){
        Query query = new Query(Criteria.where("userId").is(userId));
        List<ExperimentMapInfo> experiments = mongoTemplate.find(query, ExperimentMapInfo.class);
        return experiments;
}

    public ExperimentMapInfo findExperimentByExperimentId(String experimentId,String userId){
        Query query = new Query(Criteria.where("userId").is(userId)
        .and("_id").is(experimentId));
        ExperimentMapInfo experiment = mongoTemplate.findOne(query,ExperimentMapInfo.class);
        return experiment;
    }

    public void insertExperiment(ExperimentMapInfo experiment){
        mongoTemplate.insert(experiment);
    }



}
