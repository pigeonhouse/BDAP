package com.pigeonhouse.loginservice.dao;

import com.pigeonhouse.loginservice.entity.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Repository
public class TokenDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void insertNewToken(RefreshToken refreshToken) {
        mongoTemplate.insert(refreshToken, "refreshToken");
    }

    public RefreshToken findRefreshTokenByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        return mongoTemplate.findOne(query, RefreshToken.class);
    }


    public void deleteRefreshTokenByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        mongoTemplate.remove(query, "refreshToken");
    }


}
