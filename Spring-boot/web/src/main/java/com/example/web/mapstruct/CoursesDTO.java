package com.example.web.mapstruct;

import java.util.List;
import java.util.Optional;

import com.example.web.model.Courses;
import com.example.web.model.EntryLevel;

import jakarta.persistence.*;
import lombok.*;    
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CoursesDTO {
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

    public static CoursesDTO fromEntity(Courses courses) {
        return CoursesDTO.builder()
            .id(courses.getId())
            .departmentId(courses.getDepartmentId())
            .classId(courses.getClassId())
            .semesterId(courses.getSemesterId())
            .courseCode(courses.getCourseCode())
            .courseTitle(courses.getCourseTitle())
            .courseUnit(courses.getCourseUnit())
            .courseStatus(courses.getCourseStatus())
            .build();
    }
}
