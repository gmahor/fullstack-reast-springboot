package com.eazybytes.eazystore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter @Getter @AllArgsConstructor
public class OrderItemResponseDto {
    String productName;
    Integer quantity;
    BigDecimal price;
    String imageUrl;
}
