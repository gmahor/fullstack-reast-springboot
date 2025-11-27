package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.LoginReqDto;
import com.eazybytes.eazystore.dto.LoginRespDto;
import com.eazybytes.eazystore.dto.RegisterReqDto;
import com.eazybytes.eazystore.dto.UserDto;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    private final CompromisedPasswordChecker compromisedPasswordChecker;

    @PostMapping("/login")
    public ResponseEntity<LoginRespDto> apiLogin(@RequestBody LoginReqDto loginReqDto) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqDto.username(), loginReqDto.password()));
            UserDto userDto = new UserDto();
            Customer loggedInUSer = (Customer) authenticate.getPrincipal();
            BeanUtils.copyProperties(loggedInUSer, userDto);
            String token = jwtUtil.generateJwtToken(authenticate);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new LoginRespDto(HttpStatus.OK.getReasonPhrase(),
                            userDto, token));
        } catch (BadCredentialsException ex) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Invalid username or password");
        } catch (AuthenticationException ex) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Authentication Failed");
        } catch (Exception ex) {
            return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An unexpected error occurred");
        }
    }

    private ResponseEntity<LoginRespDto> buildErrorResponse(HttpStatus status,
                                                            String message) {
        return ResponseEntity
                .status(status)
                .body(new LoginRespDto(message, null, null));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody RegisterReqDto registerReqDto) {

        CompromisedPasswordDecision decision = compromisedPasswordChecker.check(registerReqDto.getPassword());
        if (decision.isCompromised()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("password", "Choose a strong password"));
        }
        Optional<Customer> existingCustomer = customerRepository.findByEmailOrMobileNumber
                (registerReqDto.getEmail(), registerReqDto.getMobileNumber());
        if (existingCustomer.isPresent()) {
            Map<String, String> errors = new HashMap<>();
            Customer customer = existingCustomer.get();

            if (customer.getEmail().equalsIgnoreCase(registerReqDto.getEmail())) {
                errors.put("email", "Email is already registered");
            }
            if (customer.getMobileNumber().equals(registerReqDto.getMobileNumber())) {
                errors.put("mobileNumber", "Mobile number is already registered");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        Customer customer = new Customer();
        BeanUtils.copyProperties(registerReqDto, customer);
        customer.setPasswordHash(passwordEncoder.encode(registerReqDto.getPassword()));
//        customer.setCreatedAt(Instant.now());
        customer.setCreatedBy("System");
        customer.setUpdatedBy("System");
        customerRepository.save(customer);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registration successful");
    }


}
