package com.pigeonhouse.bdap.util.response;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/26 19:43
 * <p>
 * 在controller中返回时
 * 统一使用该类进行封装
 * 即返回一个new Response()
 */
@NoArgsConstructor
@Data
public class Response {

    private Integer code;
    private String message;
    private Object data;

    public Response(Status status, Object data) {
        this.code = status.getCode();
        this.message = status.getMessage();
        this.data = data;
    }
}
