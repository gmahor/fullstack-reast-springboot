package com.eazybytes.eazystore.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PublicPathConfig {

    @Bean
    public List<String> publicPaths(){
        return List.of(
                "/api/v1/products/getProducts",
                "/api/v1/products/search/**",
                "/api/v1/products/getProduct/**",
                "/api/v1/products/sort/**",
                "api/v1/contacts/**"
                );
    }

}
