package com.example.web.RequestsBody;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SchoolManagementAuthenticationRequestBody {
    private String accesscode;
    private String password;
}
