package com.pigeonhouse.experimentservice.dao;

import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class ModuleDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveModuleInfo(NodeInfo nodeInfo) {
        mongoTemplate.save(nodeInfo);
    }

    public NodeInfo findByELabel(String elabel) {
        Query query = new Query(Criteria.where("elabel").is(elabel));
        return mongoTemplate.findOne(query, NodeInfo.class);
    }


    public List<NodeInfo> findAll() {
        return mongoTemplate.find(new Query(), NodeInfo.class);
    }

}
