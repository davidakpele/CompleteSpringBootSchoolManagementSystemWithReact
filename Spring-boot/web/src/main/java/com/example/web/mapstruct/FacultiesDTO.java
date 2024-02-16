package com.example.web.mapstruct;


import com.example.web.model.Faculties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacultiesDTO {
    private Long id;
    private String facultyName;
    private String facultyHead;

    // You can add other fields as needed

    public static FacultiesDTO fromEntity(Faculties faculties) {
        return FacultiesDTO.builder()
                .id(faculties.getId())
                .facultyName(faculties.getFacultyName())
                .build();
    }
}

