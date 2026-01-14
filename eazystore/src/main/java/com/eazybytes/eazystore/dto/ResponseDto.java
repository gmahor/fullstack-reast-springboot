package com.eazybytes.eazystore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseDto {

    private String statusCode;

    private String statusMsg;
}
