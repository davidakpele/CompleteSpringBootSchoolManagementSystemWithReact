package com.example.web.repository;

import com.example.web.model.Categories;
import com.example.web.model.EntryLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriesRepository  extends JpaRepository<Categories, Long> {


    @Query("SELECT c FROM Categories c WHERE c.status = true")
    List<Categories> findAllCategoriesWithFeatures();
}
