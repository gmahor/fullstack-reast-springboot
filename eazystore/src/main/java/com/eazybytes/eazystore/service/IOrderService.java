package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.OrderRequestDto;

public interface IOrderService {

    void createOrder(OrderRequestDto orderRequest);

}
