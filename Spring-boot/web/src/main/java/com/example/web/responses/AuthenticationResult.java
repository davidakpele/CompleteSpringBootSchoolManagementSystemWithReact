package com.example.web.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResult {
    private String message;
    private AuthenticationResponse authenticationResponse;
}
