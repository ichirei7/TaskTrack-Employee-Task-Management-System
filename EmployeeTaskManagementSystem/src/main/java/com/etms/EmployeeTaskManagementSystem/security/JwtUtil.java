package com.etms.EmployeeTaskManagementSystem.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import com.etms.EmployeeTaskManagementSystem.model.User;

import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key key;
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }
    // add id, role, name to the Jwt payload 
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail()) // or user.getUsername()
                .claim("id", user.getId())
                .claim("role", user.getRole().toString())
                .claim("name", user.getName()) 
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }


    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
