package com.example.web.RequestsBody;

import com.example.web.mapstruct.SuperUserRecordsDTO;
import com.example.web.mapstruct.SuperUsersDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SuperUserDetailsRequestBody {
    @JsonProperty("UserAuthenticationInfo")
    private SuperUsersDTO superUsersDTO;
    @JsonProperty("UserRecordInfo")
    private SuperUserRecordsDTO superUserRecordsDTO;

    public SuperUserDetailsRequestBody(SuperUsersDTO superUsersDTO, SuperUserRecordsDTO superUserRecordsDTO) {
        this.superUsersDTO = superUsersDTO;
        this.superUserRecordsDTO = superUserRecordsDTO;
    }

    public SuperUsersDTO getSuperUsersDTO() {
        return superUsersDTO;
    }

    public void setSuperUsersDTO(SuperUsersDTO superUsersDTO) {
        this.superUsersDTO = superUsersDTO;
    }

    public SuperUserRecordsDTO getSuperUserRecordsDTO() {
        return superUserRecordsDTO;
    }

    public void setSuperUserRecordsDTO(SuperUserRecordsDTO superUserRecordsDTO) {
        this.superUserRecordsDTO = superUserRecordsDTO;
    }

}
