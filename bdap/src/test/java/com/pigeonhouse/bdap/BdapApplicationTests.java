package com.pigeonhouse.bdap;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.controller.SparkCodeController;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.apache.hadoop.io.retry.AtMostOnce;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

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

    @Test
    public void test01() {
        HeaderAttribute id = new HeaderAttribute("id", "String");
        HeaderAttribute name = new HeaderAttribute("name", "String");
        HeaderAttribute age = new HeaderAttribute("age", "Integer");
        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
        attributes.add(id);
        attributes.add(name);
        attributes.add(age);

        CsvHeader header = new CsvHeader("1", "test", attributes);

//        fileHeaderAttriDao.saveCsvHeader(header);
    }

    @Test
    public void test02(){
        HashMap<String, String> map = new HashMap<>();
        map.put("age", "Integer");
        map.put("name", "String");

    }

}
