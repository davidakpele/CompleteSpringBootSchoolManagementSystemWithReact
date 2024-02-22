package com.example.web.model;

import com.example.web.mapstruct.mappers.LongListSerializer;
import com.example.web.mapstruct.mappers.StringToLongListDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "managementRole")
public class ManagementRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long professorId;
    private String categoryId;
    private String facultyId;
    private String departmentId;
    private String designation;
    private Long role;
}
