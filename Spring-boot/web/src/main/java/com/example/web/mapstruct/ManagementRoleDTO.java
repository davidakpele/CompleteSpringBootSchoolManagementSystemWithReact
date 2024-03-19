package com.example.web.mapstruct;

import com.example.web.model.ManagementRole;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ManagementRoleDTO {
    @Id
    @JsonIgnore
    private Long id;
    private Long professorId;
    private String categoryId;
    private String facultyId;
    private String departmentId;
    private String designation;
    private Long role;

    public static ManagementRoleDTO fromEntity(ManagementRole managementRole) {
        ManagementRoleDTO managementRoleDTO = new ManagementRoleDTO();
        managementRoleDTO.setProfessorId(managementRole.getProfessorId());
        managementRoleDTO.setCategoryId(managementRole.getCategoryId());
        managementRoleDTO.setFacultyId(managementRole.getFacultyId());
        managementRoleDTO.setDepartmentId(managementRole.getDepartmentId());
        managementRoleDTO.setDesignation(managementRole.getDesignation());
        managementRoleDTO.setRole(managementRole.getRole());
        return managementRoleDTO;
    }
}
