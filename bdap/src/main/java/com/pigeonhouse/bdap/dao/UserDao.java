package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.metadata.BdapUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 添加User对象到数据库
     *
     * @param bdapUser 新建对象
     */
    public void saveUser(BdapUser bdapUser) {
        mongoTemplate.save(bdapUser);
    }

    /**
     * 根据Id查询数据库User对象
     *
     * @param id 数据库对象Id
     * @return 查询的User对象
     */
    public BdapUser findByUserId(String id) {
        Query userId = new Query(Criteria.where("userId").is(id));
        BdapUser findBdapUser = mongoTemplate.findOne(userId, BdapUser.class);
        return findBdapUser;
    }

    /**
     * 查询数据库所有User对象
     *
     * @return 查询结果
     */
    public List<BdapUser> findAll() {
        List<BdapUser> bdapUsers = mongoTemplate.find(new Query(new Criteria()), BdapUser.class);
        return bdapUsers;
    }


}
