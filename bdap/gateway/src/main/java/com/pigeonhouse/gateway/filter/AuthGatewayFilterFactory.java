package com.pigeonhouse.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/24 19:28
 */
@Component
public class AuthGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthGatewayFilterFactory.Config> {

    public AuthGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            System.out.println("Welcome to AuthFilter.");
            String token = exchange.getRequest().getHeaders().getFirst("Cookie");
            System.out.println(token);
            if (Config.secret.equals(token)) {
                return chain.filter(exchange);
            }
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        };
    }

    static class Config {
        static String secret = "1234";
    }
}
