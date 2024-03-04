package com.example.web.repository;

import com.example.web.mapstruct.FacultiesDTO;
import com.example.web.model.Departments;
import com.example.web.model.Faculties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultiesRepository extends JpaRepository<Faculties, Long> {

    @Query("SELECT f FROM Faculties f WHERE f.categoryId = :categoryId")
    List<Faculties> findFacultiesByCategoryId(@Param("categoryId") Long categoryId);
    List<Faculties> findFacultiesById(Long facultyId);
}
