package com.example.web.mapstruct;

import com.example.web.model.Categories;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoriesDTO {
    private String DataId;

    public static CategoriesDTO fromEntity(Categories categories) {
        CategoriesDTO categoriesDTO = new CategoriesDTO();
        categoriesDTO.setDataId(String.valueOf(categories.getId()));
        return categoriesDTO;
    }
}
