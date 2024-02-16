package com.example.web.controllers;

import com.example.web.exceptions.CurrentUserNotFoundException;
import com.example.web.mapstruct.CategoriesDTO;
import com.example.web.mapstruct.EntryLevelDTO;
import com.example.web.mapstruct.FacultiesDTO;
import com.example.web.model.Departments;
import com.example.web.model.EntryLevel;
import com.example.web.model.Faculties;
import com.example.web.model.Programs;
import com.example.web.responses.ExtendedJsonResponse;
import com.example.web.responses.JsonResponse;
import com.example.web.services.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = {"Authorization", "Content-Type", "X-Requested-With"})
@RestController
@RequestMapping("/api/v1")
public class ApiController {
    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);
    private final FacultiesService facultiesService;
    private final DepartmentsService departmentsService;
    private final ProgramsService programsService;
    private final EntryLevelService entryLevelService;

    public ApiController(FacultiesService facultiesService, DepartmentsService departmentsService, ProgramsService programsService, EntryLevelService entryLevelService) {
        this.facultiesService = facultiesService;
        this.departmentsService = departmentsService;
        this.programsService = programsService;
        this.entryLevelService = entryLevelService;
    }

    @GetMapping("/collections/getfaculties/{categoryId}")
    public JsonResponse<List<Faculties>> listFaculties(@PathVariable Long categoryId) {
        if (categoryId != null && categoryId > 0) {
            List<Faculties> facultiesList = facultiesService.getFacultiesByCategoryId(categoryId);
            return new JsonResponse<>("Success", facultiesList);
        }
        throw new CurrentUserNotFoundException("Authorized.");
    }

    @GetMapping("/collections/getdepartments/{facultyId}")
    public JsonResponse<List<Departments>> listDepartments(@PathVariable Long facultyId) {
        if (facultyId != null && facultyId > 0) {
            List<Departments> departmentsList = departmentsService.getDepartmentsByFacultyId(facultyId);
            return new JsonResponse<>("Success", departmentsList);
        }
        throw new CurrentUserNotFoundException("Authorized.");
    }
    
    @GetMapping("/collections/getprograms/{categoryId}")
    public JsonResponse<List<Programs>> listPrograms(@PathVariable Long categoryId) {
        if (categoryId != null && categoryId > 0) {
            List<Programs> programsList = programsService.getProgramsByCategoryId(categoryId);
            return new JsonResponse<>("Success", programsList);
        }
        throw new CurrentUserNotFoundException("Authorized.");
    }

    @GetMapping("/collections/getentrylevels/{categoryId}")
    public List<EntryLevelDTO> getEntryLevelsByCategoryId(@PathVariable Long categoryId) {
        List<EntryLevel> entryLevels = entryLevelService.getEntryLevelsByCategoryId(categoryId);
        return entryLevels.stream()
                .map(EntryLevelDTO::fromEntity)
                .collect(Collectors.toList());
    }


}
