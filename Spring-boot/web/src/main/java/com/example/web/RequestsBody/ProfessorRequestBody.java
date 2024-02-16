package com.example.web.RequestsBody;

import com.example.web.mapstruct.ProfessorRecordsDTO;
import com.example.web.mapstruct.ProfessorsDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProfessorRequestBody {
    @JsonProperty("ProfessorAuthenticationInfo")
    private ProfessorsDTO professorsDTO;
    @JsonProperty("ProfessorRecordInfo")
    private ProfessorRecordsDTO professorRecordsDTO;

    public ProfessorRequestBody(ProfessorsDTO professorsDTO, ProfessorRecordsDTO professorRecordsDTO) {
        this.professorsDTO = professorsDTO;
        this.professorRecordsDTO = professorRecordsDTO;
    }

    public ProfessorsDTO getProfessorsDTO() {
        return professorsDTO;
    }

    public void setProfessorsDTO(ProfessorsDTO professorsDTO) {
        this.professorsDTO = professorsDTO;
    }

    public ProfessorRecordsDTO getProfessorRecordsDTO() {
        return professorRecordsDTO;
    }

    public void setProfessorRecordsDTO(ProfessorRecordsDTO professorRecordsDTO) {
        this.professorRecordsDTO = professorRecordsDTO;
    }
}
