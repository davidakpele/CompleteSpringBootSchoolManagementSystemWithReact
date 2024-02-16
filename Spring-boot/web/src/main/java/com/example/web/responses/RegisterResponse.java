package com.example.web.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String status;
    private String message;
    private String verificationLink;
}
