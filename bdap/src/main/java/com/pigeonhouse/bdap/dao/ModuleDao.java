package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.nodeinfo.NodeInfo;
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

    /**
     * 添加nodeInfo对象到数据库
     *
     * @param nodeInfo 新建对象
     */
    public void saveModuleInfo(NodeInfo nodeInfo) {
        mongoTemplate.save(nodeInfo);
    }

    /**
     * @return 查询的NodeInfo对象
     */
    public NodeInfo findByELabel(String elabel) {
        Query query = new Query(Criteria.where("elabel").is(elabel));
        return mongoTemplate.findOne(query, NodeInfo.class);
    }

    /**
     * @return 查询结果
     */
    public List<NodeInfo> findAll() {
        return mongoTemplate.find(new Query(), NodeInfo.class);
    }

//
//    /**
//
//     * @param sparkCode 更新的对象
//     */
//    public void updateSparkCode(SparkCode sparkCode) {
//        Query query = new Query(Criteria.where("algorithmName").is(sparkCode.getCodeId()));
//        Update update = new Update().set("label", sparkCode.getLabel()).set("elabel", sparkCode.getElabel())
//                .set("originCode", sparkCode.getOriginCode()).set("type", sparkCode.getType())
//                .set("shape", sparkCode.getShape()).set("viewAttributes", sparkCode.getViewAttributes());
//        //更新查询返回结果集的第一条
//        mongoTemplate.updateFirst(query, update, SparkCode.class);
//    }
//
//
//    /**
//     * 删除数据库SparkCode对象
//     *
//     * @param codeId 删除对象的codeId
//     */
//    public void deleteSparkCodeById(String codeId) {
//        Query query = new Query(Criteria.where("algorithmName").is(codeId));
//        mongoTemplate.remove(query, SparkCode.class);
//    }
//
//
//
//    public String findByCodeIdToJson(String codeId) {
//        String jsonString = JSONObject.toJSONString(findByELabel(codeId));
//        return jsonString;
//    }
//
//    public List<String> findAllToJson() {
//        List<SparkCode> sparkCodes = findAll();
//        ArrayList<String> sparkCodeStrings = new ArrayList<>();
//        for (SparkCode sparkCode : sparkCodes) {
//            sparkCode.setOriginCode(null);
//            String jsonString = JSONObject.toJSONString(sparkCode);
//            sparkCodeStrings.add(jsonString);
//        }
//        return sparkCodeStrings;
//    }
//    public void addInputAttribute(String codeId, String label, String elabel, String regexp) {
//        SparkCode sparkCode = findByELabel(codeId);
//        ArrayList<AttrInfo> viewAttributes = sparkCode.getViewAttributes();
//        if (viewAttributes == null) {
//            viewAttributes = new ArrayList<AttrInfo>();
//        }
//        viewAttributes.add(new AttrInfo(label, elabel, "Input", regexp));
//        sparkCode.setViewAttributes(viewAttributes);
//        updateSparkCode(sparkCode);
//    }
//
//    public void addNumberAttribute(String codeId, String label, String elabel, String min, String max, String step) {
//        SparkCode sparkCode = findByELabel(codeId);
//        ArrayList<AttrInfo> viewAttributes = sparkCode.getViewAttributes();
//        if (viewAttributes == null) {
//            viewAttributes = new ArrayList<AttrInfo>();
//        }
//        viewAttributes.add(new AttrInfo(label, elabel, "Number", min, max, step));
//        sparkCode.setViewAttributes(viewAttributes);
//        updateSparkCode(sparkCode);
//    }
//
//    public void addSelectAttribute(String codeId, String label, String elabel, ArrayList<LabelName> value, Boolean multiChoice) {
//        SparkCode sparkCode = findByELabel(codeId);
//        ArrayList<AttrInfo> viewAttributes = sparkCode.getViewAttributes();
//        if (viewAttributes == null) {
//            viewAttributes = new ArrayList<AttrInfo>();
//        }
//        viewAttributes.add(new AttrInfo(label, elabel, "Select", value, multiChoice));
//        sparkCode.setViewAttributes(viewAttributes);
//        updateSparkCode(sparkCode);
//    }
//
//    public void updateOriginCode(String codeId, String originCode) {
//        SparkCode sparkCode = findByELabel(codeId);
//        sparkCode.setOriginCode(originCode);
//        updateSparkCode(sparkCode);
//    }
//
//    public void deleteSparkCode(String codeId) {
//        deleteSparkCodeById(codeId);
//    }

}
