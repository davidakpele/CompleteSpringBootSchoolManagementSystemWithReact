package com.example.web.mapstruct;

import com.example.web.model.StudentRecords;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentRecordsDTOs {
    @Id
    @JsonIgnore
    private Long id;
    private String applicationId;
    private String facultyId;
    private String departmentId;
    private String programId;
    private String nationalIdentificationNumber;
    private String entryLevel;

    private String firstname;
    private String surname;
    private String dateOfBirth;
    private String gender;
    private String email;
    private String relationShipStatus;
    private String mobile;

    @JsonBackReference
    private StudentsDTOs student;
    // Constructors, getters, setters
    public static StudentRecordsDTOs fromEntity(StudentRecords record) {
        StudentRecordsDTOs studentRecordsDTOs = new StudentRecordsDTOs();
        studentRecordsDTOs.setId(record.getId());
        studentRecordsDTOs.setApplicationId(record.getApplicationId());
        studentRecordsDTOs.setFacultyId(record.getFacultyId());
        studentRecordsDTOs.setDepartmentId(record.getDepartmentId());
        studentRecordsDTOs.setProgramId(record.getProgramId());
        studentRecordsDTOs.setNationalIdentificationNumber(record.getNationalIdentificationNumber());
        studentRecordsDTOs.setEntryLevel(record.getEntryLevel());
        studentRecordsDTOs.setFirstname(record.getFirstname());
        studentRecordsDTOs.setSurname(record.getSurname());
        studentRecordsDTOs.setDateOfBirth(record.getDateOfBirth());
        studentRecordsDTOs.setGender(record.getGender());
        studentRecordsDTOs.setEmail(record.getEmail());
        studentRecordsDTOs.setRelationShipStatus(record.getRelationShipStatus());
        studentRecordsDTOs.setMobile(record.getMobile());


        return studentRecordsDTOs;
    }
}
