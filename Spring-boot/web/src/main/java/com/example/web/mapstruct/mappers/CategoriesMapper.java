package com.example.web.mapstruct.mappers;

import com.example.web.mapstruct.CategoriesDTO;
import com.example.web.model.Categories;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoriesMapper {
    CategoriesMapper INSTANCE = Mappers.getMapper(CategoriesMapper.class);
    CategoriesDTO toDto(Categories categories);
}
