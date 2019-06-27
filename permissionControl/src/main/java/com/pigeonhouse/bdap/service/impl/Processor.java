package com.pigeonhouse.bdap.service.impl;

import com.pigeonhouse.bdap.dao.SqlMapper;
import com.pigeonhouse.bdap.entity.User;
import com.pigeonhouse.bdap.service.IProcessor;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/25 18:13
 */
@Mapper
@Repository
public class Processor implements IProcessor {

    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public Boolean checkPassword(int id, String password) {
        List<User> userList = sqlMapper.selectUserById(id);
        if(userList.size() == 0){
            return false;
        }else if(userList.get(0).getPassword().equals(password)){
            return true;
        }
        return false;

    }
}
