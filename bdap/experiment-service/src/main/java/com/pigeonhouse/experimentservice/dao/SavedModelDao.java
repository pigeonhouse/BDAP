package com.pigeonhouse.experimentservice.dao;

import com.pigeonhouse.experimentservice.entity.ExperimentDescription;
import com.pigeonhouse.experimentservice.entity.SavedModel;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SavedModelDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveModel(SavedModel model) {
        mongoTemplate.save(model,"savedModel");
    }

    public List<SavedModel> findModelsByUserId(String userId){
        Query query = new Query(Criteria.where("userId").is(userId));
        return mongoTemplate.find(query, SavedModel.class);
    }
}
