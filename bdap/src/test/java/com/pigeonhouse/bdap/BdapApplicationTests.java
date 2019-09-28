package com.pigeonhouse.bdap;

import com.alibaba.fastjson.JSONObject;
import com.csvreader.CsvReader;
import com.pigeonhouse.bdap.controller.FileHeaderAttriController;
import com.pigeonhouse.bdap.controller.SparkCodeController;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.ChinaEngBean;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.service.JoinCodeService;
import com.pigeonhouse.bdap.service.SparkCodeService;
import com.pigeonhouse.bdap.util.response.Response;
import org.apache.hadoop.io.retry.AtMostOnce;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.*;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Autowired
    UserDao userDao;

    @Autowired
    SparkCodeDao sparkCodeDao;

    @Autowired
    SparkCodeService sparkCodeService;

    @Autowired
    SparkCodeController sparkCodeController;

    @Autowired
    FileHeaderAttriDao fileHeaderAttriDao;

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    @Autowired
    FileHeaderAttriController fileHeaderAttriController;

    @Autowired
    JoinCodeService joinCodeService;

    @Test
    public void test01() {
        Response response = fileHeaderAttriController.getCsvHeader("/s");

        System.out.println(response);
    }

    @Test
    public void test02() throws IOException {

        HashMap<String, String> map = new HashMap<>();
        map.put("userId", "2017211524");
        map.put("moduleId", "123456");
        map.put("targetCol", "age");
        map.put("type", "average");
        map.put("filePath", "/test");

        String s = joinCodeService.transParam("OF001", map);
        System.out.println(s);
    }

    @Test
    public void test03(){
        System.out.println(sparkCodeService.findByCodeIdToJson("PP005"));
    }
}
