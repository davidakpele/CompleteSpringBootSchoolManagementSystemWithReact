package com.example.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.web.model.Courses;


@Repository
public interface CoursesRepository extends JpaRepository<Courses, Long>{
    
    
}
