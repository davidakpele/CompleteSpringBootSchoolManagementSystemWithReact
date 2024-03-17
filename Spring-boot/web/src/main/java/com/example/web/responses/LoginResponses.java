package com.example.web.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponses {
    private String token;
    private String name;
    private String status;
    protected String id;
    protected String role;
    protected String message;
}
