package com.pigeonhouse.bdap.entity.prework;

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
    ArrayList<String> currentFile;

    public User(String id, String name, String password, ArrayList<String> currentFile) {
        this.userId = id;
        this.userName = name;
        this.password = password;
        this.currentFile = currentFile;
    }
}
