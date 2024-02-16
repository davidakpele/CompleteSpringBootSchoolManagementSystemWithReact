package com.example.web.mapstruct;

import com.example.web.model.StudentRecords;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuperUserRecordsDTO {
    @Id
    @JsonIgnore
    private Long id;
    private String firstname;
    private String surname;
    private String gender;
    private String mobile;
    private String dateOfBirth;
    private String role;
    private String photoUrl;

    public static SuperUserRecordsDTO fromEntity(SuperUserRecordsDTO studentRecordsDTOs) {
        SuperUserRecordsDTO SuperUserRecordsDTO = new SuperUserRecordsDTO();
        SuperUserRecordsDTO.setId(studentRecordsDTOs.getId());
        SuperUserRecordsDTO.setFirstname(studentRecordsDTOs.getFirstname());
        SuperUserRecordsDTO.setSurname(studentRecordsDTOs.getSurname());
        SuperUserRecordsDTO.setGender(studentRecordsDTOs.getGender());
        SuperUserRecordsDTO.setMobile(studentRecordsDTOs.getMobile());
        SuperUserRecordsDTO.setDateOfBirth(studentRecordsDTOs.getDateOfBirth());
        SuperUserRecordsDTO.setRole(studentRecordsDTOs.getRole());
        SuperUserRecordsDTO.setPhotoUrl(studentRecordsDTOs.getPhotoUrl());
        return studentRecordsDTOs;
    }
}
