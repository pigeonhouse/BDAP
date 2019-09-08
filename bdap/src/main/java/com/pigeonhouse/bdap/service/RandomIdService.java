package com.pigeonhouse.bdap.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/8 11:34
 */
@Service
public class RandomIdService {
    public String getId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replace("-", "");
    }
}
