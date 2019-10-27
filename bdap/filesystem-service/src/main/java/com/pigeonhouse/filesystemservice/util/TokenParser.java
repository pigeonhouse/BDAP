package com.pigeonhouse.filesystemservice.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class TokenParser {
    public static Map<String, Claim> getClaimsFromRequest(HttpServletRequest request) {
        return JWT.decode(request.getHeader("token")).getClaims();
    }

    public static LivySessionInfo getSessionInfoFromRequest(HttpServletRequest request){
        Map<String, Claim> claims = getClaimsFromRequest(request);
        String livyAddr = claims.get("livyAddr").asString();
        int sessionId = claims.get("sessionId").asInt();
        return new LivySessionInfo(livyAddr,sessionId);
    }
}
