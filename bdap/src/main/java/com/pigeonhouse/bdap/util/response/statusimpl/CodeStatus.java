package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author: Qiu Ji
 * @DATE: 2019/9/28 20:17
 */
public enum CodeStatus implements Status {

    CODE_PUT_SUCCESS(200, "算法参数发送成功！");

    int code;
    String message;

    CodeStatus(int code, String message) {
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
