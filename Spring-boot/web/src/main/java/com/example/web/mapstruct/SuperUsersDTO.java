package com.example.web.mapstruct;

import com.example.web.model.Students;
import com.example.web.model.SuperUsers;
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
    private String password;

    public static SuperUsersDTO fromEntity(SuperUsers superUsers) {
        SuperUsersDTO superUsersDTO = new SuperUsersDTO();
        superUsersDTO.setId(superUsers.getId());
        superUsersDTO.setEmail(superUsers.getEmail());
        superUsersDTO.setPassword(superUsers.getPassword());
        // Set other fields as needed
        return superUsersDTO;
    }
    public void removeNullProperties() {
    }
}
