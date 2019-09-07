package com.pigeonhouse.bdap;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@MapperScan("com.pigeonhouse.bdap.mapper")
@SpringBootApplication
public class BdapApplication {

    public static void main(String[] args) {
        SpringApplication.run(BdapApplication.class, args);
    }

}
