package com.example.web.repository;

import com.example.web.model.EntryLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryLevelRepository extends JpaRepository<EntryLevel, Long> {
    List<EntryLevel> findByCategoryId(Long categoryId);
}
