package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class JoinCodeService {

    @Autowired
    SparkCodeService sparkCodeService;

    /**
     * 给代码传入参数
     * @param codeId Spark代码编号
     * @param attributes 传入参数
     * @return 完整spark代码
     */
    public String transParam(String codeId, Map<String, String> attributes){
        SparkCode sparkCode = sparkCodeService.findByCodeId(codeId);
        String code = sparkCode.getOriginCode();

        String data = "";

        String[] split = code.split("%s");

        System.out.println(split.length);
        for(int i = 0; i < attributes.size(); i++){
            split[i] += "%s";
            if(i == 0){
                data += String.format(split[i], attributes.get("moduleId"));
            } else if(i == 1){
                data += String.format(split[i], attributes.get("targetCol"));
            } else{
                data += String.format(split[i], attributes.get(sparkCode.getAttributes().get(i - 2).getElabel()));
            }
        }
        data += split[split.length - 1];
        return data;
    }
}
