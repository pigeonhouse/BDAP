package com.pigeonhouse.gateway.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.Claim;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AuthGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthGatewayFilterFactory.Config> {

    public AuthGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            System.out.println("Welcome to AuthFilter.");
            String token = exchange.getRequest().getHeaders().getFirst("token");
            System.out.println(token);
            if (token == null) {
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
            try {
                String userId = JWT.decode(token).getAudience().get(0);
                Map<String, Claim> claims = JWT.decode(token).getClaims();
                return chain.filter(exchange);
            } catch (JWTDecodeException j) {
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.BAD_REQUEST);
                return response.setComplete();
            }
        };
    }

    static class Config {
        static String secret = "1234";
    }
}
