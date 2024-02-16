package com.example.web.auth;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import java.util.Map;

public class CustomAuthenticationProvider extends DaoAuthenticationProvider {

    protected String extractPrincipal(Map<String, ?> map) {
        // Extract the matriculation number as the principal
        return (String) map.get("matric_number");
    }
}
