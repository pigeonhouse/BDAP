package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.dao.UserRepository;
import com.pigeonhouse.bdap.entity.prework.User;
import com.pigeonhouse.bdap.entity.prework.attributes.InputAttribute;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Optional;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:33
 */
@Service("UserService")
public class UserService {
    @Resource
    UserRepository userRepository;

    public User findUserById(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        InputAttribute inputAttribute = new InputAttribute();
        return user.orElse(null);
    }
}