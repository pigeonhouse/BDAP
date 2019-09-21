package com.pigeonhouse.bdap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication()
public class BdapApplication {

    public static void main(String[] args) {
        SpringApplication.run(BdapApplication.class, args);
    }

}
