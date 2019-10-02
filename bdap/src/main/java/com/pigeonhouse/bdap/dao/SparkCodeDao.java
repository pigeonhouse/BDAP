package com.pigeonhouse.bdap.dao;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.viewattrs.ViewAttributes;
import com.pigeonhouse.bdap.entity.prework.valueattrs.LabelName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
        Query query = new Query(Criteria.where("algorithmName").is(codeId));
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
        Query query = new Query(Criteria.where("algorithmName").is(sparkCode.getCodeId()));
        Update update = new Update().set("label", sparkCode.getLabel()).set("elabel", sparkCode.getElabel())
                .set("originCode", sparkCode.getOriginCode()).set("type", sparkCode.getType())
                .set("shape", sparkCode.getShape()).set("viewAttributes", sparkCode.getViewAttributes());
        //更新查询返回结果集的第一条
        mongoTemplate.updateFirst(query, update, SparkCode.class);
    }


    /**
     * 删除数据库SparkCode对象
     *
     * @param codeId 删除对象的codeId
     */
    public void deleteSparkCodeById(String codeId) {
        Query query = new Query(Criteria.where("algorithmName").is(codeId));
        mongoTemplate.remove(query, SparkCode.class);
    }



    public String findByCodeIdToJson(String codeId) {
        String jsonString = JSONObject.toJSONString(findByCodeId(codeId));
        return jsonString;
    }

    public List<String> findAllToJson() {
        List<SparkCode> sparkCodes = findAll();
        ArrayList<String> sparkCodeStrings = new ArrayList<>();
        for (SparkCode sparkCode : sparkCodes) {
            sparkCode.setOriginCode(null);
            String jsonString = JSONObject.toJSONString(sparkCode);
            sparkCodeStrings.add(jsonString);
        }
        return sparkCodeStrings;
    }

    public void addSparkCode(String codeId, String type, String label, String elabel, String originCode, String shape) {
        SparkCode sparkCode = new SparkCode();
        sparkCode.setCodeId(codeId);
        sparkCode.setType(type);
        sparkCode.setLabel(label);
        sparkCode.setElabel(elabel);
        sparkCode.setOriginCode(originCode);
        sparkCode.setShape(shape);
        sparkCode.setViewAttributes(new ArrayList<ViewAttributes>());
        saveSparkCode(sparkCode);
    }

    public void addInputAttribute(String codeId, String label, String elabel, String regexp) {
        SparkCode sparkCode = findByCodeId(codeId);
        ArrayList<ViewAttributes> viewAttributes = sparkCode.getViewAttributes();
        if (viewAttributes == null) {
            viewAttributes = new ArrayList<ViewAttributes>();
        }
        viewAttributes.add(new ViewAttributes(label, elabel, "Input", regexp));
        sparkCode.setViewAttributes(viewAttributes);
        updateSparkCode(sparkCode);
    }

    public void addNumberAttribute(String codeId, String label, String elabel, String min, String max, String step) {
        SparkCode sparkCode = findByCodeId(codeId);
        ArrayList<ViewAttributes> viewAttributes = sparkCode.getViewAttributes();
        if (viewAttributes == null) {
            viewAttributes = new ArrayList<ViewAttributes>();
        }
        viewAttributes.add(new ViewAttributes(label, elabel, "Number", min, max, step));
        sparkCode.setViewAttributes(viewAttributes);
        updateSparkCode(sparkCode);
    }

    public void addSelectAttribute(String codeId, String label, String elabel, ArrayList<LabelName> value, Boolean multiChoice) {
        SparkCode sparkCode = findByCodeId(codeId);
        ArrayList<ViewAttributes> viewAttributes = sparkCode.getViewAttributes();
        if (viewAttributes == null) {
            viewAttributes = new ArrayList<ViewAttributes>();
        }
        viewAttributes.add(new ViewAttributes(label, elabel, "Select", value, multiChoice));
        sparkCode.setViewAttributes(viewAttributes);
        updateSparkCode(sparkCode);
    }

    public void updateOriginCode(String codeId, String originCode) {
        SparkCode sparkCode = findByCodeId(codeId);
        sparkCode.setOriginCode(originCode);
        updateSparkCode(sparkCode);
    }

    public void deleteSparkCode(String codeId) {
        deleteSparkCodeById(codeId);
    }

}
