package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.OrderRequestDto;
import com.eazybytes.eazystore.dto.OrderResponseDto;

import java.util.List;

public interface IOrderService {

    void createOrder(OrderRequestDto orderRequest);

    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

}
