package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author XingTianYu
 * @date 2019/9/27 10:00
 */
public enum CommonFileStatus implements Status {
    //
    FILE_INSERT_SUCCESS(200, "加入新文件成功!"),
    USER_INSERT_SUCCESS(201, "加入新用户成功!"),
    FILE_GET_SUCCESS(202, "文件列表获取成功!"),
    USER_NOT_FOUND(411, "未找到对应用户!"),
    FILE_HAS_EXISTED(409, "文件已存在!"),
    USER_HAS_EXISTED(408, "用户已存在!");

    Integer code;
    String message;


    CommonFileStatus(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
