package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileResponseDto {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private boolean emailUpdated;
}
