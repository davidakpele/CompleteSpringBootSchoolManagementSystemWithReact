package com.example.web.repository;

import com.example.web.model.Professors;
import com.example.web.model.StudentRecords;
import com.example.web.model.Students;
import com.example.web.model.SuperUserRecords;
import com.example.web.model.SuperUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SuperUserRepository extends JpaRepository<SuperUsers, Long> {

    Optional<SuperUsers> findByEmail(String email);

    @Query(value = "SELECT s1.id, s1.created_on, s1.email, s1.enabled, s1.password, s1.role, s1.updated_on, s2.id AS record_id, s2.date_of_birth,  s2.firstname, s2.gender, s2.mobile, s2.surname, s2.super_user_id FROM super_users s1 LEFT JOIN super_user_records s2 ON s1.id = s2.super_user_id WHERE s1.id = :userId", nativeQuery = true)
    SuperUsers findSuperWithRecordsById(Long userId);

    @Query("SELECT s FROM SuperUsers s LEFT JOIN FETCH s.superUserRecords")
    List<SuperUsers> findAllWithSuperUserRecords();

    @Modifying
    @Query("DELETE FROM SuperUsers s WHERE s.Id IN :id")
    void deleteSuperUsersByIdIn(List<Long> id);

    

}
