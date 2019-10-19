package com.pigeonhouse.bdap.entity.metadata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:24
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    String cid;
    String userId;
    String userName;
    String password;

    public User(String id, String name, String password) {
        this.userId = id;
        this.userName = name;
        this.password = password;
    }
}
