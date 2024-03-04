package com.example.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.web.model.Subjects;

@Repository
public interface SubjectsRepository extends JpaRepository<Subjects, Long> {
    
}
