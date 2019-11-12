package com.pigeonhouse.experimentservice.dao;


import com.pigeonhouse.experimentservice.entity.experiment.ExperimentDescription;
import com.pigeonhouse.experimentservice.entity.experiment.ExperimentMapInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class ExperimentDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ExperimentDescription> findExperimentDescriptionByUserId(String userId){
        Query query = new Query(Criteria.where("userId").is(userId));
        return mongoTemplate.find(query, ExperimentDescription.class);
}

    public ExperimentMapInfo findExperimentByExperimentIdAndUserId(String experimentId, String userId){
        Query query = new Query(Criteria.where("userId").is(userId)
        .and("experimentId").is(experimentId));
        return mongoTemplate.findOne(query,ExperimentMapInfo.class);
    }

    public void updateExperimentByExperimentIdAndUserId(String experimentId, String userId,ExperimentMapInfo experimentMapInfo){
        Update update = new Update();
        update.set("nodes",experimentMapInfo.getNodes());
        update.set("edges",experimentMapInfo.getEdges());
        Query query = new Query(Criteria.where("userId").is(userId)
                .and("experimentId").is(experimentId));
        mongoTemplate.updateFirst(query,update,ExperimentMapInfo.class);
    }

    public void deleteExperimentByExperimentIdAndUserId(String experimentId, String userId){
        Query query = new Query(Criteria.where("userId").is(userId)
                .and("experimentId").is(experimentId));
        mongoTemplate.remove(query,ExperimentMapInfo.class);
        mongoTemplate.remove(query,ExperimentDescription.class);
    }

    public void saveExperiment(ExperimentMapInfo experiment){
        mongoTemplate.save(experiment);
    }

    public void saveDescription(ExperimentDescription description){
        mongoTemplate.save(description);
    }

}
