package com.pigeonhouse.bdap.service.runcode;

import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.service.filesystem.SparkCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @Author: 邱吉
 * @Date: 2019/9/27 11:33
 */
@Service
public class JoinCodeService {

    @Autowired
    SparkCodeService sparkCodeService;

    /**
     * 给代码传入参数
     *
     * @param codeId     Spark代码编号
     * @param attributes 传入参数
     * @return 完整spark代码
     */
    public String transParam(String codeId, Map<String, String> attributes) {
        SparkCode sparkCode = sparkCodeService.findByCodeId(codeId);
        String code = sparkCode.getOriginCode();

        String data = "";

        String[] split = code.split("%s");

        for (int i = 0; i < split.length - 1; i++) {
            split[i] += "%s";
            if (i == 0) {
                data += String.format(split[i], attributes.get("userId"));
            } else if (i == 1) {
                data += String.format(split[i], attributes.get("moduleId"));
            } else if (i == 2) {
                data += String.format(split[i], attributes.get("targetCol"));
            } else if (i == split.length - 4) {
                data += String.format(split[i], attributes.get("previousId"));
            } else if (i == split.length - 3) {
                data += String.format(split[i], attributes.get("moduleId"));
            } else if (i == split.length - 2) {
                data += String.format(split[i], "10.105.222.90");
            } else {
                data += String.format(split[i], attributes.get(sparkCode.getAttributes().get(i - 3).getElabel()));
            }
        }
        data += split[split.length - 1];

        return data;
    }

    public String openFileCode(Map<String, String> attributes) {
        SparkCode sparkCode = sparkCodeService.findByCodeId("OF001");
        String code = sparkCode.getOriginCode();

        String data = "";

        String[] split = code.split("%s");

        data += String.format(split[0] + "%s", attributes.get("userId"));
        data += String.format(split[1] + "%s", attributes.get("moduleId"));
        data += String.format(split[2] + "%s", attributes.get("filePath"));
        data += String.format(split[3] + "%s", "10.105.222.90");

        return data + split[4];
    }
}
