package com.pigeonhouse.bdap;

import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.entity.prework.attributes.Attribute;
import com.pigeonhouse.bdap.entity.prework.attributes.InputAttribute;
import com.pigeonhouse.bdap.entity.prework.attributes.NumberAttribute;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Autowired
    UserDao userDao;

    @Autowired
    SparkCodeDao sparkCodeDao;

    @Autowired
    SparkCodeService sparkCodeService;

    @Test
    public void test01() {
        List<User> users = userDao.findAll();
        System.out.println(users);
    }

}
