package com.pigeonhouse.bdap.util.response;

import com.pigeonhouse.bdap.service.TokenService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

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
    private String token;
    private Object data;

}
