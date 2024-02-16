package com.example.web.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ProfessorRecords")
public class ProfessorRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "professor_id")
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
}
