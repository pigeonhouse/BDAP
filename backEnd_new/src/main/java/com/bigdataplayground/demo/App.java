package com.bigdataplayground.demo;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;

/**
 * 配置步骤：
 * 1. appAddr改成自己的地址（只需要改此一处)。涉及到结果回传，因此不能用127.0.0.1
 * 2. 添加hosts
 * Win:
 * C:\Windows\System32\drivers\etc\hosts
 * MacOS/Linux:
 * /etc/hosts
 * 添加以下四行
 * 10.105.222.90   mirage17
 * 10.105.222.91   mirage18
 * 10.105.222.92   mirage19
 * 10.105.222.93   mirage20
 *
 * 文件目录
 * config       一些配置文件
 * domain       一些类
 * util         一些工具
 * controller   一些controller
 */
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}

