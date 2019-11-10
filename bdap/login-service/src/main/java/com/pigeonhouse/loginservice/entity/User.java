package com.pigeonhouse.loginservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 20:13
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    String userId;
    String userName;
    String password;

}

