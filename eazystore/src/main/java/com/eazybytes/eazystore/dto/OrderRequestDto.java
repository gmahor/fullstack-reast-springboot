package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
public class OrderRequestDto {

    private BigDecimal totalPrice;

    private String paymentId;

    private String paymentStatus;

    private List<OrderItemDto> items;


}
