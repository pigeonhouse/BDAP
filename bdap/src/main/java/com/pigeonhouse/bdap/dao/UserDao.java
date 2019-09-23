package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.prework.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;


    /**
     * @param user 新建对象
     */
    public void saveTest(User user){
        mongoTemplate.save(user);
    }

    /**
     * @param id 数据库对象Id
     * @return 查询的User对象
     */
    public User findByUserId(String id){
        Query userId = new Query(Criteria.where("userId").is(id));
        User findUser = mongoTemplate.findOne(userId, User.class);
        return findUser;
    }



}
