package com.example.web.RequestsBody;

import com.example.web.mapstruct.ManagementRoleDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AppointmentManagementRequestBody {
    @JsonProperty("appointmentFormData")
    private ManagementRoleDTO managementRoleDTO;

    // Add default constructor
    public AppointmentManagementRequestBody() {
    }

    public AppointmentManagementRequestBody(ManagementRoleDTO managementRoleDTO) {
        this.managementRoleDTO = managementRoleDTO;
    }

    public ManagementRoleDTO getManagementRoleDTO() {
        return managementRoleDTO;
    }

    public void setManagementRoleDTO(ManagementRoleDTO managementRoleDTO) {
        this.managementRoleDTO = managementRoleDTO;
    }
}