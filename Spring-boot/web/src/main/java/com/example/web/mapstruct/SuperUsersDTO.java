package com.example.web.mapstruct;

import java.util.List;
import java.util.stream.Collectors;

import com.example.web.model.Students;
import com.example.web.model.SuperUsers;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuperUsersDTO {
    @Id
    private Long id;
    private String email;
    @JsonIgnore  // Exclude the password field from JSON serialization
    private String password;
    private Long role;
    @JsonManagedReference
    private List<SuperUserRecordsDTO> records;

    public static SuperUsersDTO fromEntity(SuperUsers superUsers) {
        SuperUsersDTO superUsersDTO = new SuperUsersDTO();
        superUsersDTO.setId(superUsers.getId());
        superUsersDTO.setEmail(superUsers.getEmail());
        superUsersDTO.setPassword(superUsers.getPassword());
        superUsersDTO.setRole(superUsers.getRole());
        List<SuperUserRecordsDTO> recordsDTOs = superUsers.getSuperUserRecords()
                .stream()
                .map(SuperUserRecordsDTO::fromEntity)
                .collect(Collectors.toList());
        superUsersDTO.setRecords(recordsDTOs);
        return superUsersDTO;
    }
    

    
}
