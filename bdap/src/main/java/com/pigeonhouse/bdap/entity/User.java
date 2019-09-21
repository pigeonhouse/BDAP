package com.pigeonhouse.bdap.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

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

}
