package com.example.web.repository;

import com.example.web.mapstruct.StudentRecordsDTOs;
import com.example.web.model.StudentRecords;
import com.example.web.model.Students;
import com.example.web.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface StudentRepository extends JpaRepository<Students, Long> {
    Optional<Object> findByEmail(String email);

    Optional<Students> findByMatricNumber(String matricNumber);
    Optional<Students>findByMatricNumberAndEnabledTrue(String matricNumber);

    @Query("SELECT s FROM Students s LEFT JOIN FETCH s.studentRecords")
    List<Students> findAllWithStudentRecords();

    @Query(value = "SELECT s1.id, s1.created_on, s1.email, s1.enabled, s1.matric_number, s1.password, s1.role, s1.updated_on, s2.id AS record_id, s2.application_id, s2.date_of_birth, s2.department_id, s2.email AS record_email, s2.entry_level, s2.faculty_id, s2.firstname, s2.gender, s2.mobile, s2.national_identification_number, s2.program_id, s2.relation_ship_status, s2.surname FROM students s1 LEFT JOIN studentrecords s2 ON s1.id = s2.student_id WHERE s1.id = :studentId", nativeQuery = true)
    Students findStudentWithRecordsById(@Param("studentId") Long studentId);

    @Modifying
    @Query("DELETE FROM Students s WHERE s.id IN :id")
    void deleteStudentByIdIn(List<Long> id);
}
