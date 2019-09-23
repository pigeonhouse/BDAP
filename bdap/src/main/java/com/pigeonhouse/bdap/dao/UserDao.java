package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.prework.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 添加User对象到数据库
     * @param user 新建对象
     */
    public void saveUser(User user){
        mongoTemplate.save(user);
    }

    /**
     * 根据Id查询数据库User对象
     * @param id 数据库对象Id
     * @return 查询的User对象
     */
    public User findByUserId(String id){
        Query userId = new Query(Criteria.where("userId").is(id));
        User findUser = mongoTemplate.findOne(userId, User.class);
        return findUser;
    }

    /**
     * 更新数据库User对象
     * @param user 更新的对象
     */
    public void updateUse(User user) {
        Query query=new Query(Criteria.where("userId").is(user.getUserId()));
        Update update= new Update().set("userName", user.getUserName()).set("passWord", user.getPassword());
        //更新查询返回结果集的第一条
        mongoTemplate.updateFirst(query, update, User.class);
    }


    /**
     * 删除数据库User对象
     * @param userId 删除User对象的Id
     */
    public void deleteUserById(String userId) {
        Query query=new Query(Criteria.where("userId").is(userId));
        mongoTemplate.remove(query, User.class);
    }

}
