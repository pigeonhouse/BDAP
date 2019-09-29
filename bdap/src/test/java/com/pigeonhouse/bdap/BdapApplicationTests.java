package com.pigeonhouse.bdap;

import com.pigeonhouse.bdap.controller.filesystem.FileHeaderAttriController;
import com.pigeonhouse.bdap.controller.filesystem.SparkCodeController;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.filesystem.SparkCodeService;
import com.pigeonhouse.bdap.service.runcode.JoinCodeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.HashMap;

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
    public void test03() {
        System.out.println(sparkCodeService.findByCodeIdToJson("PP005"));
    }
}
