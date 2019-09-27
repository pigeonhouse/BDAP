package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.prework.SparkCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SparkCodeDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 添加SparkCode对象到数据库
     *
     * @param sparkCode 新建对象
     */
    public void saveSparkCode(SparkCode sparkCode) {
        mongoTemplate.save(sparkCode);
    }

    /**
     * 根据codeId查询数据库SparkCode对象
     *
     * @param codeId 数据库对象codeId
     * @return 查询的SparkCode对象
     */
    public SparkCode findByCodeId(String codeId) {
        Query query = new Query(Criteria.where("codeId").is(codeId));
        SparkCode code = mongoTemplate.findOne(query, SparkCode.class);
        return code;
    }

    /**
     * 查询数据库所有SparkCode对象
     *
     * @return 查询结果
     */
    public List<SparkCode> findAll() {
        List<SparkCode> sparkCodes = mongoTemplate.find(new Query(new Criteria()), SparkCode.class);
        return sparkCodes;
    }

    /**
     * 更新数据库SparkCode对象
     *
     * @param sparkCode 更新的对象
     */
    public void updateSparkCode(SparkCode sparkCode) {
        Query query = new Query(Criteria.where("codeId").is(sparkCode.getCodeId()));
        Update update = new Update().set("label", sparkCode.getLabel()).set("elabel", sparkCode.getElabel())
                .set("originCode", sparkCode.getOriginCode()).set("type", sparkCode.getType())
                .set("shape", sparkCode.getShape()).set("attributes", sparkCode.getAttributes());
        //更新查询返回结果集的第一条
        mongoTemplate.updateFirst(query, update, SparkCode.class);
    }


    /**
     * 删除数据库SparkCode对象
     *
     * @param codeId 删除对象的codeId
     */
    public void deleteSparkCodeById(String codeId) {
        Query query = new Query(Criteria.where("codeId").is(codeId));
        mongoTemplate.remove(query, SparkCode.class);
    }
}
