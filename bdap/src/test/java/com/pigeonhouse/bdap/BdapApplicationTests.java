package com.pigeonhouse.bdap;

import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Autowired
    UserDao userDao;

    @Test
    public void test01() {
        User user = userDao.findByUserId("2017211524");
        System.out.println(user);

        userDao.deleteUserById("2017211524");

        User user1 = new User("2017211506", "兰泽军", "456789");
        User user2 = new User("2017211524", "邱吉", "123456");
        userDao.saveUser(user1);
        userDao.saveUser(user2);

    }

}
