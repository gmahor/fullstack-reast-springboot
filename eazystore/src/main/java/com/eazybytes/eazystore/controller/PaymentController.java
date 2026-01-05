package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.PaymentIntentRespDto;
import com.eazybytes.eazystore.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final IPaymentService IPaymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Object> createPaymentIntent(@RequestBody PaymentIntentRequestDto paymentRequest){
        PaymentIntentRespDto response = IPaymentService.createPaymentIntent(paymentRequest);
        return ResponseEntity.ok(response);
    }
}
