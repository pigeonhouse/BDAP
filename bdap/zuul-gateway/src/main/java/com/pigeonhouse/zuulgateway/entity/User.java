package com.pigeonhouse.zuulgateway.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/24 16:00
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    String userId;
    String userName;
    String password;

}
