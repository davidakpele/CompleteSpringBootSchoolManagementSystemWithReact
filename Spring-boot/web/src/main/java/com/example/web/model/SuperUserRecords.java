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
@Table(name = "SuperUserRecords")
public class SuperUserRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "superUser_id")
    private SuperUsers superUsers;
    private String firstname;
    private String surname;
    private String gender;
    private String mobile;
    private String dateOfBirth;
    private String photoUrl;

}
