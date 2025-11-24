package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.LoginReqDto;
import com.eazybytes.eazystore.dto.LoginRespDto;
import com.eazybytes.eazystore.dto.UserDto;
import com.eazybytes.eazystore.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginRespDto> apiLogin(@RequestBody LoginReqDto loginReqDto) {
        try {
           Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqDto.username(), loginReqDto.password()));
            String token = jwtUtil.generateJwtToken(authenticate);
            UserDto userDto = new UserDto();
           User user = (User) authenticate.getPrincipal();
            userDto.setName(user.getUsername());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new LoginRespDto(HttpStatus.OK.getReasonPhrase(),
                            userDto, token));
        }catch (BadCredentialsException ex){
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Invalid username or password");
        }catch (AuthenticationException ex){
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Authentication Failed");
        }catch (Exception ex){
            return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An unexpected error occurred");
        }
    }

    private ResponseEntity<LoginRespDto> buildErrorResponse(HttpStatus status,
                                                            String message) {
        return ResponseEntity
                .status(status)
                .body(new LoginRespDto(message,null,null));
    }


}
