package com.eazybytes.eazystore.dto;

public record LoginRespDto(String message, UserDto user,String jwtToken) {
}
