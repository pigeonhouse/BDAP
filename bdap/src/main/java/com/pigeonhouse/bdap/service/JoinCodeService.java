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


        for(int i = 0; i < split.length - 1; i++){
            split[i] += "%s";
            if(i == 0){
                data += String.format(split[i], attributes.get("userId"));
            } else if(i == 1){
                data += String.format(split[i], attributes.get("moduleId"));
            } else if(i == 2){
                data += String.format(split[i], attributes.get("targetCol"));
            } else if(i == split.length - 4){
                data += String.format(split[i], attributes.get("previousId"));
            } else if(i == split.length - 3){
                data += String.format(split[i], attributes.get("moduleId"));
            }  else if(i == split.length - 2){
                data += String.format(split[i], "10.105.222.90");
            } else{
                data += String.format(split[i], attributes.get(sparkCode.getAttributes().get(i - 3).getElabel()));
            }

        }
        data += split[split.length - 1];

        return data;
    }
}
