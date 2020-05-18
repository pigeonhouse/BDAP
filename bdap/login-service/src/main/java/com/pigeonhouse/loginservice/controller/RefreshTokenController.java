package com.pigeonhouse.loginservice.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.loginservice.dao.TokenDao;
import com.pigeonhouse.loginservice.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class    RefreshTokenController {

    @Autowired
    RefreshTokenService refreshTokenService;

    @GetMapping("/access-token")
    public ResponseEntity refreshToken(@RequestHeader("refreshToken") String refreshToken) {
        try {
            String accessToken = refreshTokenService.refreshToken(refreshToken);
            return ResponseEntity.ok(accessToken);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
    }

}
