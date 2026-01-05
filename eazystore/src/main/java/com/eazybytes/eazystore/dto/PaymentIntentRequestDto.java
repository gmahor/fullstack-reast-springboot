package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class PaymentIntentRequestDto {

    private Long amount;

    private String currency;
}
