package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ProfileRequestDto;
import com.eazybytes.eazystore.dto.ProfileResponseDto;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final IProfileService iProfileService;

    @GetMapping
    public ResponseEntity<Object> getProfile(){
        ProfileResponseDto profile = iProfileService.getProfile();
        return  ResponseEntity.status(HttpStatus.OK).body(profile);
    }

    @PutMapping
    public ResponseEntity<Object> updateProfile(@Validated @RequestBody ProfileRequestDto profileRequestDto){
        ProfileResponseDto profileResponseDto = iProfileService.updateProfile(profileRequestDto);
        return  ResponseEntity.status(HttpStatus.OK).body(profileResponseDto);
    }

}
