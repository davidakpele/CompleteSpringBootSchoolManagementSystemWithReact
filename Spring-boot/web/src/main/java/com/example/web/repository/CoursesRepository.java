package com.example.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.web.model.Courses;


@Repository
public interface CoursesRepository extends JpaRepository<Courses, Long>{

    @Modifying
    @Query("DELETE FROM Courses c WHERE c.id IN :id")
    void deleteByIdIn(List<Long> id);
    
    
}
