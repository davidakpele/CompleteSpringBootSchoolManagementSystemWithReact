package com.example.web.repository;


import com.example.web.model.ManagementRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagementRoleRepository  extends JpaRepository<ManagementRole, Long> {
    boolean existsByProfessorId(Long professorId);

    Optional<Object> findByProfessorId(Long professorId);
}
