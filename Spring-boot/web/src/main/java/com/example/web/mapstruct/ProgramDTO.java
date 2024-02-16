package com.example.web.mapstruct;


import com.example.web.model.Faculties;
import com.example.web.model.Programs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgramDTO {
    private Long id;
    private String programName;


    public static ProgramDTO fromEntity(Programs programs) {
        return ProgramDTO.builder()
                .id(programs.getId())
                .programName(programs.getProgramName())
                .build();
    }
}
