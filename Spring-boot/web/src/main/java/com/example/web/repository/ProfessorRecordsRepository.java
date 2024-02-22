package com.example.web.repository;

import com.example.web.model.ProfessorRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRecordsRepository extends JpaRepository<ProfessorRecords, Long> {
    @Modifying
    @Query("DELETE FROM ProfessorRecords r WHERE r.professors.Id IN :id")
    void deleteRecordsByProfessorsIds(List<Long> id);
    @Query("SELECT pr FROM ProfessorRecords pr WHERE pr.professors.Id = :professorId")
    Optional<ProfessorRecords> findByProfessorId(@Param("professorId") Long professorId);

}
