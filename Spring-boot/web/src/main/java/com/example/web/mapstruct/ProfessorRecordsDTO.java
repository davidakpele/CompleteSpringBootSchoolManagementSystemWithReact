package com.example.web.mapstruct;

import com.example.web.model.ProfessorRecords;
import com.example.web.model.Professors;
import com.example.web.model.StudentRecords;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorRecordsDTO {
    @Id
    @JsonIgnore
    private Long id;
    private Professors professors;
    private String firstname;
    private String surname;
    private String mobile;
    private String dateOfBirth;
    private String gender;
    private String relationshipStatus;
    private String nationalIdentificationNumber;
    private String religion;
    private String bloodType;
    private String address;
    private String photoUrl;
    private String qualification;

    @JsonBackReference
    private ProfessorsDTO professorsDTO;
    public static ProfessorRecordsDTO fromEntity(ProfessorRecords professorRecords) {
        ProfessorRecordsDTO professorRecordsDTO = new ProfessorRecordsDTO();
        professorRecordsDTO.setId(professorRecords.getId());
        professorRecordsDTO.setFirstname(professorRecords.getFirstname());
        professorRecordsDTO.setSurname(professorRecords.getSurname());
        professorRecordsDTO.setMobile(professorRecords.getMobile());
        professorRecordsDTO.setDateOfBirth(professorRecords.getDateOfBirth());
        professorRecordsDTO.setGender(professorRecords.getGender());
        professorRecordsDTO.setRelationshipStatus(professorRecords.getRelationshipStatus());
        professorRecordsDTO.setNationalIdentificationNumber(professorRecords.getNationalIdentificationNumber());
        professorRecordsDTO.setReligion(professorRecords.getReligion());
        professorRecordsDTO.setBloodType(professorRecords.getBloodType());
        professorRecordsDTO.setAddress(professorRecords.getAddress());
        professorRecordsDTO.setPhotoUrl(professorRecords.getPhotoUrl());
        professorRecordsDTO.setQualification(professorRecords.getQualification());
        return professorRecordsDTO;
    }
}
