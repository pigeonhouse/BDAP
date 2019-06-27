package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.User;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/25 18:12
 */
public interface IProcessor {
    /**
     * 检测id是否与密码匹配
     * @param id
     * @param password
     * @return
     */
    Boolean checkPassword(int id, String password);
}
