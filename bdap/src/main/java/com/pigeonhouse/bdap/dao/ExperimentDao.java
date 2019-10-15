package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.mapinfo.ExperimentDescription;
import com.pigeonhouse.bdap.entity.mapinfo.ExperimentMapInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Author：ZhangJiaYi
 * Time:2019/9/26 17:12
 */
@Repository
public class ExperimentDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ExperimentDescription> findExperimentDescriptionByUserId(String userId){
        Query query = new Query(Criteria.where("userId").is(userId));
        List<ExperimentDescription> experiments = mongoTemplate.find(query, ExperimentDescription.class);
        return experiments;
}

    public ExperimentMapInfo findExperimentByExperimentIdAndUserId(String experimentId, String userId){
        Query query = new Query(Criteria.where("userId").is(userId)
        .and("experimentId").is(experimentId));
        ExperimentMapInfo experiment = mongoTemplate.findOne(query,ExperimentMapInfo.class);
        return experiment;
    }

//    public void updateExperimentByExperimentIdAndUserId(String experimentId, String userId,ExperimentMapInfo experimentMapInfo){
//        mongoTemplate.up;
//    }

    public void deleteExperimentByExperimentIdAndUserId(String experimentId, String userId){
        mongoTemplate.remove(new Query(Criteria.where("userId").is(userId).and("experimentId").is(experimentId)));
    }

    public void insertExperiment(ExperimentMapInfo experiment){
        mongoTemplate.insert(experiment);
    }

    public void insertDescription(ExperimentDescription description){
        mongoTemplate.insert(description);
    }

}
