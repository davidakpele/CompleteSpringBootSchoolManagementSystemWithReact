package com.example.web.mapstruct;

import com.example.web.model.StudentRecords;
import com.example.web.model.SuperUserRecords;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private String photoUrl;

    @JsonBackReference
    private SuperUsersDTO superUsersDTO;
    
    public static SuperUserRecordsDTO fromEntity(SuperUserRecords records) {
        SuperUserRecordsDTO SuperUserRecordsDTO = new SuperUserRecordsDTO();
        SuperUserRecordsDTO.setId(records.getId());
        SuperUserRecordsDTO.setFirstname(records.getFirstname());
        SuperUserRecordsDTO.setSurname(records.getSurname());
        SuperUserRecordsDTO.setGender(records.getGender());
        SuperUserRecordsDTO.setMobile(records.getMobile());
        SuperUserRecordsDTO.setDateOfBirth(records.getDateOfBirth());
        SuperUserRecordsDTO.setPhotoUrl(records.getPhotoUrl());
        return SuperUserRecordsDTO;
    }
}
