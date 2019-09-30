package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/30 16:11
 */
public enum PostCodeStatus implements Status {
    //登录状态码
    SUCCESS(200, "提交代码成功"),
    SESSION_BUSY(401, "session正忙，请稍后再试");

    Integer code;
    String message;

    PostCodeStatus(Integer code, String message) {
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
