package com.example.web.repository;

import com.example.web.model.Programs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProgramsRepository extends JpaRepository<Programs, Long> {

    @Query("SELECT p FROM Programs p WHERE p.categoryId = :categoryId")
    List<Programs> findProgramsByCategoryId(@Param("categoryId") Long categoryId);
}
