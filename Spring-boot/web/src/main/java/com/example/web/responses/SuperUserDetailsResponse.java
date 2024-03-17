package com.example.web.responses;

import com.example.web.mapstruct.SuperUserRecordsDTO;
import com.example.web.mapstruct.SuperUsersDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuperUserDetailsResponse {
    private SuperUsersDTO superUsersDTO;
    private SuperUserRecordsDTO superUserRecordsDTO;
}