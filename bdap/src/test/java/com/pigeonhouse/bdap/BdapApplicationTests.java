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
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.service.JoinCodeService;
import com.pigeonhouse.bdap.service.SparkCodeService;
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
        HeaderAttribute id = new HeaderAttribute("id", "String");
        HeaderAttribute name = new HeaderAttribute("name", "String");
        HeaderAttribute age = new HeaderAttribute("age", "Integer");
        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
        attributes.add(id);
        attributes.add(name);
        attributes.add(age);

        CsvHeader header = new CsvHeader("test", "/test", attributes);

//        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath("/");

        String csvHeader = fileHeaderAttriController.getCsvHeader("/");
        System.out.println(csvHeader);
//        fileHeaderAttriDao.saveCsvHeader(header);
    }

    @Test
    public void test02() throws IOException {
        SparkCode code = sparkCodeDao.findByCodeId("PP002");
        HashMap<String, String> map = new HashMap<>();
        map.put("moduleId", "123456");
        map.put("targetCol", "age");
        map.put("numBuckets", "5");
        map.put("newColName", "target");
        String s = joinCodeService.transParam("PP002", map);
        System.out.println(s);
    }

}
