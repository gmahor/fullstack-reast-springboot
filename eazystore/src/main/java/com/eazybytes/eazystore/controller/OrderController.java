package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.OrderRequestDto;
import com.eazybytes.eazystore.dto.OrderResponseDto;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.service.IOrderService;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService iOrderService;

    private final IProfileService profileService;

    private final OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto requestDto) {
        iOrderService.createOrder(requestDto);
        return ResponseEntity.ok("Order created successfully!");
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> loadCustomerOrders() {
        return ResponseEntity.ok(iOrderService.getCustomerOrders());
    }

}
