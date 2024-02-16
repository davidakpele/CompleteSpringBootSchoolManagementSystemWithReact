package com.example.web.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "studentrecords")
public class StudentRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "student_id")
    private Students students;

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

}

