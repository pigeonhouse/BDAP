package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.User;
import com.pigeonhouse.bdap.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:33
 */
@Service("UserService")
public class UserService {
    @Autowired
    UserMapper userMapper;

    public User findUserById(String id){
        User user = userMapper.selectUserById(id);
        return user;
    }

    public User findUserByName(String username){
        User user = userMapper.selectUserById(username);
        return user;
    }
}