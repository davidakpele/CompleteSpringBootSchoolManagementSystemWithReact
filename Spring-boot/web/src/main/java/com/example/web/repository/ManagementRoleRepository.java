package com.example.web.repository;


import com.example.web.model.ManagementRole;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository 
public interface ManagementRoleRepository  extends JpaRepository<ManagementRole, Long> {
    boolean existsByProfessorId(Long professorId);

    Optional<Object> findByProfessorId(Long professorId);

    @Transactional
    @Modifying
    @Query("DELETE FROM ManagementRole m WHERE m.professorId = :professorId")
    void deleteByProfessorId(@Param("professorId") Long professorId);
}
