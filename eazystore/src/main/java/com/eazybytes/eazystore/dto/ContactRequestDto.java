package com.eazybytes.eazystore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestDto {

    @NotBlank(message = "Name must be required")
    @Size(min =  5, max = 30,message = "Name must be b/w 5 to 30 characters")
    private String name;

    @NotBlank(message = "Email must be required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile number must be required")
    @Pattern(regexp = "^\\d{10}$",message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Message must be required")
    @Size(min = 5,max = 500,message = "Message must be b/w 5 to 500 characters")
    private String message;
}
