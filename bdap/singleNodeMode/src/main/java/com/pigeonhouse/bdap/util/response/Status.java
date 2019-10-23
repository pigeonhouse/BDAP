package com.pigeonhouse.bdap.util.response;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/26 19:58
 */
public interface Status {
    /**
     * 获取自定义状态码
     *
     * @return
     */
    Integer getCode();

    /**
     * 获取后端给前端关于这个状态码想传达的消息
     *
     * @return
     */
    String getMessage();
}
