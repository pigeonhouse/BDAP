package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/26 19:30
 * 关于用户登录/login的状态码和消息
 *
 */
public enum LoginStatus implements Status {
    //登录状态码
    SUCCESS(200, "登录成功"),
    WRONG_PASSWORD(401, "密码错误"),
    NO_SUCH_USER(402, "用户名不存在");

    Integer code;
    String message;

    LoginStatus(Integer code, String message) {
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
