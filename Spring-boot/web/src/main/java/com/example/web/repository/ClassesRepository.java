package com.example.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.web.model.Classes;


@Repository
public interface ClassesRepository  extends JpaRepository<Classes, Long>{

    @Modifying
    @Query("DELETE FROM Classes c WHERE c.id IN :id")
    void deleteByIdIn(List<Long> id);
    
   
}
