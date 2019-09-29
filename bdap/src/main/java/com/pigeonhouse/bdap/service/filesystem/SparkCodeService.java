package com.pigeonhouse.bdap.service.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.Attribute;
import com.pigeonhouse.bdap.entity.prework.attributes.ChinaEngBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SparkCodeService {

    @Autowired
    SparkCodeDao sparkCodeDao;

    public SparkCode findByCodeId(String codeId) {
        SparkCode sparkCode = sparkCodeDao.findByCodeId(codeId);
        return sparkCode;
    }

    public String findByCodeIdToJson(String codeId) {
        String jsonString = JSONObject.toJSONString(findByCodeId(codeId));
        return jsonString;
    }

    public List<String> findAllToJson() {
        List<SparkCode> sparkCodes = sparkCodeDao.findAll();
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
        sparkCode.setAttributes(new ArrayList<Attribute>());
        sparkCodeDao.saveSparkCode(sparkCode);
    }

    public void addInputAttribute(String codeId, String label, String elabel, String regexp) {
        SparkCode sparkCode = sparkCodeDao.findByCodeId(codeId);
        ArrayList<Attribute> attributes = sparkCode.getAttributes();
        if (attributes == null) {
            attributes = new ArrayList<Attribute>();
        }
        attributes.add(new Attribute(label, elabel, "Input", regexp));
        sparkCode.setAttributes(attributes);
        sparkCodeDao.updateSparkCode(sparkCode);
    }

    public void addNumberAttribute(String codeId, String label, String elabel, String min, String max, String step) {
        SparkCode sparkCode = sparkCodeDao.findByCodeId(codeId);
        ArrayList<Attribute> attributes = sparkCode.getAttributes();
        if (attributes == null) {
            attributes = new ArrayList<Attribute>();
        }
        attributes.add(new Attribute(label, elabel, "Number", min, max, step));
        sparkCode.setAttributes(attributes);
        sparkCodeDao.updateSparkCode(sparkCode);
    }

    public void addSelectAttribute(String codeId, String label, String elabel, ArrayList<ChinaEngBean> value, Boolean multiChoice) {
        SparkCode sparkCode = sparkCodeDao.findByCodeId(codeId);
        ArrayList<Attribute> attributes = sparkCode.getAttributes();
        if (attributes == null) {
            attributes = new ArrayList<Attribute>();
        }
        attributes.add(new Attribute(label, elabel, "Select", value, multiChoice));
        sparkCode.setAttributes(attributes);
        sparkCodeDao.updateSparkCode(sparkCode);
    }

    public void updateOriginCode(String codeId, String originCode) {
        SparkCode sparkCode = sparkCodeDao.findByCodeId(codeId);
        sparkCode.setOriginCode(originCode);
        sparkCodeDao.updateSparkCode(sparkCode);
    }

    public void deleteSparkCode(String codeId) {
        sparkCodeDao.deleteSparkCodeById(codeId);
    }

}
