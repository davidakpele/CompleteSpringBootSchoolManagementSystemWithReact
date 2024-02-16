package com.example.web.services;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UniqueIdGeneratorService {

    private static final String PREFIX = "MCU.STP";

    public String generateUniqueId() {
        int randomNumber = new Random().nextInt(90000000) + 10000000;
        String clearanceCode = PREFIX + randomNumber;
        return clearanceCode;
    }
}
