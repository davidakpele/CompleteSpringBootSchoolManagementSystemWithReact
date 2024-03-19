package com.example.web.repository;

import com.example.web.model.Professors;
import com.example.web.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT s FROM Professors s WHERE s.accessCode=:accessCode AND s.features=True")
    Optional<Professors> findByAccessCodeWhereFeaturesIsTrue(String accessCode);

    @Modifying
    @Query("DELETE FROM Professors s WHERE s.Id IN :id")
    void deleteProfessorByIdIn(List<Long> id);

    @Query(value = "SELECT p1.id, p1.access_code, p1.created_on, p1.email, p1.enabled, p1.features, p1.password, p1.role, p1.updated_on, p2.address, p2.blood_type, p2.date_of_birth, p2.firstname, p2.gender, p2.mobile, p2.national_identification_number, p2.photo_url, p2.qualification, p2.relationship_status, p2.religion, p2.surname, p2.professor_id AS record_id FROM professors p1 LEFT JOIN professor_records p2 ON p1.id = p2.professor_id WHERE p1.id = :professorId", nativeQuery = true)
    Professors findProfessorWithRecordsById(@Param("professorId") Long professorId);

}
