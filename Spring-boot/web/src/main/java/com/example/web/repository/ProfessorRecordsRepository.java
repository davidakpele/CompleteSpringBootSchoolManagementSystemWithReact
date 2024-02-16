package com.example.web.repository;

import com.example.web.model.ProfessorRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRecordsRepository extends JpaRepository<ProfessorRecords, Long> {
    @Modifying
    @Query("DELETE FROM ProfessorRecords r WHERE r.professors.Id IN :id")
    void deleteRecordsByProfessorsIds(List<Long> id);
}
