package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @author HouWeiying
 */
public enum RunningStatus implements Status {
    //查询状态码
    SUCCESS(200, "成功"),
    FAIL(500, "错误");

    Integer code;
    String message;

    RunningStatus(Integer code, String message) {
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
