package com.pigeonhouse.zuulgateway.dao;

import com.pigeonhouse.zuulgateway.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/24 16:05
 */
@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 添加User对象到数据库
     *
     * @param user 新建对象
     */
    public void saveUser(User user) {
        mongoTemplate.save(user);
    }

    /**
     * 根据Id查询数据库User对象
     *
     * @param id 数据库对象Id
     * @return 查询的User对象
     */
    public User findByUserId(String id) {
        Query userId = new Query(Criteria.where("userId").is(id));
        User findUser = mongoTemplate.findOne(userId, User.class);
        return findUser;
    }

    /**
     * 查询数据库所有User对象
     *
     * @return 查询结果
     */
    public List<User> findAll() {
        List<User> users = mongoTemplate.find(new Query(new Criteria()), User.class);
        return users;
    }

}
