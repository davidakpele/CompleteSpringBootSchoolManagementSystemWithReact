package com.example.web.exceptions;

public class CurrentUserNotFoundException extends RuntimeException {
    public CurrentUserNotFoundException(String message) {
        super(message);
    }
}
