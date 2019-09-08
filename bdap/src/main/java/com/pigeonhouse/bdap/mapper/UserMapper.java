package com.pigeonhouse.bdap.mapper;

import com.pigeonhouse.bdap.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 20:32
 */
@Mapper
public interface UserMapper {

    @Select("select * from user where id=#{id}")
    User selectUserById(String id);

}
