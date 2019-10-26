package com.pigeonhouse.loginservice.dao;

import com.pigeonhouse.loginservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/26 20:14
 */
@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveUser(User user) {
        mongoTemplate.save(user);
    }

    public User findByUserId(String id) {
        Query userId = new Query(Criteria.where("userId").is(id));
        return mongoTemplate.findOne(userId, User.class);
    }

    public List<User> findAll() {
        return mongoTemplate.find(new Query(new Criteria()), User.class);
    }

}
