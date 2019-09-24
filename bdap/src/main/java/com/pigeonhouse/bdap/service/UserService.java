package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:33
 */
@Service("UserService")
public class UserService {

//    @Resource
//    UserRepository userRepository;

    @Autowired
    UserDao userDao;

    @Value("10")
    Integer maxFileNum;

    public User findUserById(String userId) {
        User user = userDao.findByUserId(userId);
        return user;
    }

    public void addCurrentFile(String userId, String currentFile){
        User user = userDao.findByUserId(userId);
        ArrayList<String> files = user.getCurrentFile();

        if(files.remove(currentFile)){
            files.add(currentFile);
        } else if(files.size() >= maxFileNum){
            files.remove(0);
            files.add(currentFile);
        }else{
            files.add(currentFile);
        }

        user.setCurrentFile(files);
        userDao.updateUse(user);
    }
}