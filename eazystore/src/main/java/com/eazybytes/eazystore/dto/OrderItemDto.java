package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class OrderItemDto {

    Long productId;

    Integer quantity;

    BigDecimal price;
}
