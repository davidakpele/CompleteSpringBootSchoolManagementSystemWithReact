package com.example.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.web.model.Semesters;

@Repository
public interface SemestersRepository extends JpaRepository<Semesters, Long> {
    
    // Custom query to check if a record with the given ClassId and Title already exists
    @Query("SELECT COUNT(s) > 0 FROM Semesters s WHERE s.ClassId = :classId AND s.Title = :title")
    boolean existsByClassIdAndTitle(@Param("classId") Long classId, @Param("title") String title);
}
