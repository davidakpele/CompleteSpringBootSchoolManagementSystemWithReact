package com.example.web.services;

import com.example.web.RequestsBody.CategoryRequestBody;
import com.example.web.mapstruct.mappers.CategoriesMapper;
import com.example.web.model.Categories;
import com.example.web.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CategoryDetailsServices {
    private final CategoriesRepository categoriesRepository;
    @Autowired
    private CategoriesMapper categoriesMapper;
    public CategoryDetailsServices(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public long getTotalCategories() {
        return categoriesRepository.count();
    }

    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public Categories addCategory(CategoryRequestBody categoryRequestBody) {
        Categories newCategory = Categories.builder()
                .categoryName(categoryRequestBody.getCategoryName())
                .parent("0")
                .status(true)
                .build();
        return categoriesRepository.save(newCategory);
    }

    public void deleteCategoryById(Long categoryId) {
        categoriesRepository.deleteById(categoryId);
    }

    public Optional<Categories> getCategoryById(Long categoryId) {
        return categoriesRepository.findById(categoryId);
    }

    public Optional<Categories> updateCategoryById(Long categoryId, CategoryRequestBody categoryRequestBody) {
        return categoriesRepository.findById(categoryId)
                .map(category -> {
                    category.setCategoryName(categoryRequestBody.getCategoryName());
                    return categoriesRepository.save(category);
                });
    }

    public Optional<Categories> updateCategoryStatus(Long id, boolean newStatus) {
        return categoriesRepository.findById(id)
                .map(category -> {
                    category.setStatus(newStatus);
                    return categoriesRepository.save(category);
                });
    }

    public List<Categories> findAllCategoriesWithFeatures() {
        return categoriesRepository.findAllCategoriesWithFeatures();
    }
}
