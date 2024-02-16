package com.example.web.repository;

import com.example.web.model.Departments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentsRepository extends JpaRepository<Departments, Long> {

    @Query("SELECT d FROM Departments d WHERE d.facultyId = :facultyId")
    List<Departments> findDepartmentsByFacultyId(@Param("facultyId") Long facultyId);
}