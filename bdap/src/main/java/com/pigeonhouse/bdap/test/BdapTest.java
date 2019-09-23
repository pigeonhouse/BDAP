package com.pigeonhouse.bdap.test;


import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.service.UserService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class BdapTest {

    @Autowired
    UserDao userDao;

    @Test
    public void Test01(){
        User user = userDao.findByUserId("2017211511");
        System.out.println(user);
    }
}
