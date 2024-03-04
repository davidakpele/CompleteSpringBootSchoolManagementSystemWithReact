package com.example.web.mapstruct;

import com.example.web.model.Semesters;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SemesterDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long parent;
    private Long ClassId;
    private String Title;

    public static SemesterDTO fromEntity(Semesters semesters) {
        return SemesterDTO.builder()
                .id(semesters.getId())
                .parent(semesters.getParent())
                .ClassId(semesters.getClassId())
                .Title(semesters.getTitle())
                .build();
    }
}
