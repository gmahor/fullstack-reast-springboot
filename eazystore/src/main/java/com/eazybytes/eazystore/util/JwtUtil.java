package com.eazybytes.eazystore.util;

import com.eazybytes.eazystore.constant.ApplicationConstants;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.exception.JwtTokenException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        try {
            String token = "";
            String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                    ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
            SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Customer fetchUser = (Customer) authentication.getPrincipal();
            return Jwts.builder().issuer("Gourav").subject("JWT TOKEN")
                    .claim("username", fetchUser.getName())
                    .claim("email", fetchUser.getEmail())
                    .claim("mobileNumber", fetchUser.getMobileNumber())
                    .claim("roles",authentication.getAuthorities().stream().map(
                                    GrantedAuthority::getAuthority)
                            .collect(Collectors.joining(",")))
                    .issuedAt(new Date())
                    .expiration(new Date(new Date().getTime() + 60 * 60 * 1000))
                    .signWith(secretKey).compact();
        } catch (Exception e) {
            throw new JwtTokenException("Error while generate jwt token!");
        }
    }


}
