package com.example.web.repository;

import com.example.web.model.SuperUserRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperUserRecordsRepository extends JpaRepository<SuperUserRecords, Long> {

}
