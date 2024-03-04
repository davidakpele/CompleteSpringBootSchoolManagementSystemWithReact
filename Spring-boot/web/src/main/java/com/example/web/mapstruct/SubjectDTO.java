package com.example.web.mapstruct;

import com.example.web.model.Classes;
import com.example.web.model.Subjects;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubjectDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long courseId;
    private String courseCode;
    private String subjectname;

    public static SubjectDTO fromEntity(Subjects subjects) {
        return SubjectDTO.builder()
                .id(subjects.getId())
                .courseId(subjects.getCourseId())
                .courseCode(subjects.getCourseCode())
                .subjectname(subjects.getSubjectname())
                .build();
    }
}
