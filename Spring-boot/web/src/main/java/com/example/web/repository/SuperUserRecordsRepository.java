package com.example.web.repository;

import com.example.web.model.SuperUserRecords;
import com.example.web.model.SuperUsers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperUserRecordsRepository extends JpaRepository<SuperUserRecords, Long> {

    Optional<SuperUserRecords> findBySuperUsersId(Long userId);

   
    @Modifying
    @Query("DELETE FROM SuperUserRecords r WHERE r.superUsers.Id IN :id")
    void deleteRecordsBySuperRecordsIds(List<Long> id);
}
