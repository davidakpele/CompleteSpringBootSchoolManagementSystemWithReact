package com.example.web.repository;

import com.example.web.model.StudentRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRecordsRepository extends JpaRepository<StudentRecords, Long> {
    Optional<StudentRecords> findByStudentsId(Long studentsId);

    @Modifying
    @Query("DELETE FROM StudentRecords r WHERE r.students.id IN :id")
    void deleteRecordsByStudentIds(List<Long> id);
}
