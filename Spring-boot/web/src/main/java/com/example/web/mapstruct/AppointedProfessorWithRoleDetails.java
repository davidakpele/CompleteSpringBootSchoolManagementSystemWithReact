package com.example.web.mapstruct;

import com.example.web.model.Categories;
import com.example.web.model.Departments;
import com.example.web.model.Faculties;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
public class AppointedProfessorWithRoleDetails {
    private Long id;
    private String surname;
    private String firstname;
    private List<Categories> categories;
    private String AppointedCategoryId;
    private String facultyRole;
    private List<Faculties> faculties;
    private List<Departments> departments;
    private String designationRole;
    private boolean isAppointed;

}
