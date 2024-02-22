package com.example.web.mapstruct;

import com.example.web.model.Categories;
import com.example.web.model.Faculties;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProfessorWithCategoriesDTO {
    private Long id;
    private String surname;
    private String firstname;
    private List<Categories> categories;
    private boolean isAppointed;
}
