package com.example.web.RequestsBody;

import com.example.web.mapstruct.StudentRecordsDTOs;
import com.example.web.mapstruct.StudentsDTOs;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterRequestBody {
    @JsonProperty("StudentAuthenticationInfo")
    private StudentsDTOs studentsDTOs;

    @JsonProperty("StudentRecordInfo")
    private StudentRecordsDTOs studentRecordsDTOs;

    public RegisterRequestBody(StudentsDTOs studentsDTOs, StudentRecordsDTOs studentRecordsDTOs) {
        this.studentsDTOs = studentsDTOs;
        this.studentRecordsDTOs = studentRecordsDTOs;
    }

    public StudentsDTOs getStudentsDTOs() {
        return studentsDTOs;
    }

    public void setStudentsDTOs(StudentsDTOs studentsDTOs) {
        this.studentsDTOs = studentsDTOs;
    }

    public StudentRecordsDTOs getStudentRecordsDTOs() {
        return studentRecordsDTOs;
    }

    public void setStudentRecordsDTOs(StudentRecordsDTOs studentRecordsDTOs) {
        this.studentRecordsDTOs = studentRecordsDTOs;
    }
}
