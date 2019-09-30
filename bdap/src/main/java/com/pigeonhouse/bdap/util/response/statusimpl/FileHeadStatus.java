package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

/**
 * @Author Qiu Ji
 * @Data: 2019/9/28 20:31
 */
public enum FileHeadStatus implements Status {

    //
    HEAD_PUT_SUCCESS(200, "读取文件字段信息成功"),
    NO_SUCH_FILE(400, "未找到对应文件");

    Integer code;
    String message;

    FileHeadStatus(Integer code, String message) {
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
