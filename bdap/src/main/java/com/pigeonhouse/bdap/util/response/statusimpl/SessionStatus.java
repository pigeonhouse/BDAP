package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/30 15:01
 */
public enum SessionStatus implements Status {
    //
    IDLE(200,"session空闲"),
    STARTING(400,"session正在启动中"),
    BUSY(401,"session正在运行中"),
    DEAD(402,"session已死亡")
    ;

    SessionStatus(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    Integer code;
    String message;

    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
