package com.eazybytes.eazystore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter @Getter @AllArgsConstructor
public class OrderResponseDto {

    private Long orderId;
    private String status;
    private BigDecimal totalPrice;
    private String createdAt;
    private List<OrderItemResponseDto> items;

}
