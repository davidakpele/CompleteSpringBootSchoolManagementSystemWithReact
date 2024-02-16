package com.example.web.mapstruct;


import com.example.web.model.Professors;
import com.example.web.model.Students;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorsDTO {
    @Id
    private Long Id;
    private String AccessCode;
    private String email;
    @JsonIgnore
    private String password;
    private  boolean features;
    @JsonManagedReference
    private List<ProfessorRecordsDTO> records;

    public static ProfessorsDTO fromEntity(Professors professors) {
        ProfessorsDTO professorsDTO = new ProfessorsDTO();
        professorsDTO.setId(professors.getId());
        professorsDTO.setEmail(professors.getEmail());
        professorsDTO.setAccessCode(professors.getAccessCode());
        professorsDTO.setFeatures(professors.isFeatures());
        List<ProfessorRecordsDTO> recordsDTOs = professors.getProfessorRecords()
                .stream()
                .map(ProfessorRecordsDTO::fromEntity)
                .collect(Collectors.toList());
        professorsDTO.setRecords(recordsDTOs);
        return professorsDTO;
    }

}
