package com.pigeonhouse.bdap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Test
    public void contextLoads() {
        String name = "aaa";
        String s = "${name}";
        System.out.println(s);

    }

}
