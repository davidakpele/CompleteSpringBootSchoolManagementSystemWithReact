package com.example.web.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "courses")
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long departmentId;
    private Long classId;
    private Long semesterId;
    private String courseCode;
    private String courseTitle;
    private String courseUnit;
    private String courseStatus;

}
