package com.pigeonhouse.livyservice.dao;

import com.pigeonhouse.livyservice.entity.RefreshToken;
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


    public void updateRefreshToken(String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.set("userId",userId);
        SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        timeFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        update.set("expireAt",timeFormat.format(new Date(System.currentTimeMillis() + 60*60*1000)));
        mongoTemplate.updateFirst(query,update, RefreshToken.class);
    }
}
