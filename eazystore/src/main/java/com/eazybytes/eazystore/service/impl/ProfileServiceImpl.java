package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ProfileResponseDto;
import com.eazybytes.eazystore.entity.Address;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements IProfileService {

    private final CustomerRepository customerRepository;


    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        return mapCustomerToProfileResponseDto(customer);
    }



    @Override
    public ProfileResponseDto updateProfile(ProfileResponseDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer, "customerId");
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        address.setCreatedBy("System");
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(customer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        return profileResponseDto;
    }

    private Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return customerRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            profileResponseDto.setStreet(customer.getAddress().getStreet());
            profileResponseDto.setCity(customer.getAddress().getCity());
            profileResponseDto.setState(customer.getAddress().getState());
            profileResponseDto.setPostalCode(customer.getAddress().getPostalCode());
            profileResponseDto.setCountry(customer.getAddress().getCountry());
        }
        return profileResponseDto;
    }
}
