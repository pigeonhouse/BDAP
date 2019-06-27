package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/25 18:07
 */
@Repository
@Mapper
public interface SqlMapper {

    /**
     * selectUserById
     * @param id
     * @return
     */
    @Select("select * from user where id = #{id}")
    List<User> selectUserById(int id);
}
