package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ProfileRequestDto;
import com.eazybytes.eazystore.dto.ProfileResponseDto;

public interface IProfileService {

    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(ProfileRequestDto profile);

}
