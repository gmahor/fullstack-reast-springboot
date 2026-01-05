package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.PaymentIntentRespDto;

public interface IPaymentService {

    PaymentIntentRespDto createPaymentIntent( PaymentIntentRequestDto paymentRequest);

}
