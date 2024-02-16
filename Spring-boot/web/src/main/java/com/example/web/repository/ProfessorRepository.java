package com.example.web.repository;

import com.example.web.model.Professors;
import com.example.web.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professors, Long> {

    Optional<Professors> findByAccessCode(String accessCode);
    Optional<Object> findByEmail(String email);
    long countByEmail(String email);
    @Query("SELECT s FROM Professors s LEFT JOIN FETCH s.professorRecords")
    List<Professors> findAllWithProfessorRecords();

    @Modifying
    @Query("DELETE FROM Professors s WHERE s.Id IN :id")
    void deleteProfessorByIdIn(List<Long> id);
}
