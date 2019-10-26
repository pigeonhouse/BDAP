package com.pigeonhouse.loginservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringCloudApplication
@SpringBootApplication
public class LoginServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoginServiceApplication.class, args);
    }

}
