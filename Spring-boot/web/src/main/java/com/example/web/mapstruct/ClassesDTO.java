package com.example.web.mapstruct;

import com.example.web.model.Classes;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassesDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Title;

    public static ClassesDTO fromEntity(Classes classes) {
        return ClassesDTO.builder()
                .id(classes.getId())
                .Title(classes.getTitle())
                .build();
    }
}
