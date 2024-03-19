package com.example.web.services;

import com.example.web.RequestsBody.AppointmentManagementRequestBody;
import com.example.web.controllers.AuthBaseController;
import com.example.web.mapstruct.ManagementRoleDTO;
import com.example.web.mapstruct.mappers.LongListSerializer;
import com.example.web.mapstruct.mappers.StringToLongListDeserializer;
import com.example.web.model.ManagementRole;
import com.example.web.model.Role;
import com.example.web.repository.ManagementRoleRepository;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ManagementRoleService {

    @Autowired
    private ManagementRoleRepository managementRoleRepository;
    private final RoleService roleService;
    private final Logger logger = LoggerFactory.getLogger(ManagementRoleService.class);
    public ManagementRoleService(RoleService roleService) {
        this.roleService = roleService;
    }
    public boolean doesProfessorExist(Long professorId) {
        return managementRoleRepository.existsByProfessorId(professorId);
    }

    public void updateManagementRole(Long professorId, ManagementRoleDTO updatedData) {
        // Retrieve the existing managementRole
        ManagementRole existingRole = (ManagementRole) managementRoleRepository.findByProfessorId(professorId)
                .orElseThrow(() -> new NoSuchElementException("ManagementRole not found for professorId: " + professorId));
        Optional<Role> role = roleService.findRoleByClearance("PROFESSOR");
        Role pRole = role.orElseThrow(() -> new NoSuchElementException("Role not found for clearance: Professor"));
        // Update all fields with the new data
        existingRole.setFacultyId(updatedData.getFacultyId());
        existingRole.setDepartmentId(updatedData.getDepartmentId());
        existingRole.setDesignation(updatedData.getDesignation());
        existingRole.setRole(pRole.getId());

        // Save the updated managementRole
        managementRoleRepository.save(existingRole);
    }
    public void appointProfessor(ManagementRoleDTO managementRoleDTO) {
        Long professorId = Long.parseLong(String.valueOf(managementRoleDTO.getProfessorId()));
        Optional<Role> role = roleService.findRoleByClearance("PROFESSOR");
        Role pRole = role.orElseThrow(() -> new NoSuchElementException("Role not found for clearance: Professor"));
        ManagementRole managementRole = ManagementRole.builder()
                .professorId(professorId)
                .categoryId(managementRoleDTO.getCategoryId())
                .facultyId(managementRoleDTO.getFacultyId())
                .departmentId(managementRoleDTO.getDepartmentId())
                .designation(managementRoleDTO.getDesignation())
                .role(pRole.getId())
                .build();

        managementRoleRepository.save(managementRole);
    }

    public ManagementRole getManagementRoleByProfessorId(Long professorId) {
        return (ManagementRole) managementRoleRepository.findByProfessorId(professorId)
                .orElseThrow(() -> new NoSuchElementException("ManagementRole not found for professorId: " + professorId));
    }
   
    public void deleteProfessorFromManagementRole(Long professorId) {
        managementRoleRepository.deleteByProfessorId(professorId);
    }

}

