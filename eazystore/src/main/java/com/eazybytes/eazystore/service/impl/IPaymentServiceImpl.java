package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.PaymentIntentRespDto;
import com.eazybytes.eazystore.service.IPaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class IPaymentServiceImpl implements IPaymentService {

    @Override
    public PaymentIntentRespDto createPaymentIntent(PaymentIntentRequestDto paymentRequest) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(paymentRequest.getAmount())
                    .setCurrency(paymentRequest.getCurrency())
                    .addPaymentMethodType("card").build();
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return new PaymentIntentRespDto(paymentIntent.getClientSecret());
        }catch (StripeException e){
            throw new RuntimeException("Failed to create payment intent",e);
        }
    }
}
