package com.example.web.repository;

import com.example.web.model.Categories;
import com.example.web.model.EntryLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository  extends JpaRepository<Categories, Long> {

}
