package com.eazybytes.eazystore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ContactResponseDto {

    private Long contactId;
    private String name;
    private String email;
    private String mobileNumber;
    private String message;
    private String status;
}
