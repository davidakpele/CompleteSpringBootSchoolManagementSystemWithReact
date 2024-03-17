package com.example.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.web.model.Subjects;

@Repository
public interface SubjectsRepository extends JpaRepository<Subjects, Long> {

    @Modifying
    @Query("DELETE FROM Subjects c WHERE c.id IN :id")
    void deleteByIdIn(List<Long> id);
    
}
