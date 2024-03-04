package com.example.web.services;

import com.example.web.RequestsBody.FacultyRequestBody;
import com.example.web.mapstruct.FacultiesDTO;
import com.example.web.mapstruct.mappers.FacultiesMapper;
import com.example.web.model.Categories;
import com.example.web.model.Faculties;
import com.example.web.repository.FacultiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultiesService {

    private final FacultiesRepository facultiesRepository;

    @Autowired
    public FacultiesService(FacultiesRepository facultiesRepository) {
        this.facultiesRepository = facultiesRepository;
    }

    public List<Faculties> getFacultiesByCategoryId(Long categoryId) {
        return facultiesRepository.findFacultiesByCategoryId(categoryId);
    }

    public long getTotalFaculties() {
        return facultiesRepository.count();
    }

    public List<Faculties> getAllFaculties() {
        return facultiesRepository.findAll();
    }

    public Optional<Faculties> getFacultyById(Long facultyId) {
        return facultiesRepository.findById(facultyId);
    }

    public Faculties saveFaculty(FacultyRequestBody facultyRequestBody) {
        Faculties newFaculty = Faculties.builder()
                .categoryId(facultyRequestBody.getCategoryId())
                .facultyName(facultyRequestBody.getFacultyName())
                .build();
        return facultiesRepository.save(newFaculty);
    }

    public Optional<Faculties> updateFaculty(Long facultyId, FacultyRequestBody facultyRequestBody) {
        Optional<Faculties> optionalFaculty = facultiesRepository.findById(facultyId);

        if (optionalFaculty.isPresent()) {
            Faculties existingFaculty = optionalFaculty.get();
            existingFaculty.setCategoryId(facultyRequestBody.getCategoryId());
            existingFaculty.setFacultyName(facultyRequestBody.getFacultyName());
            return Optional.of(facultiesRepository.save(existingFaculty));
        }
        return Optional.empty();
    }

    public boolean deleteFaculty(Long facultyId) {
        Optional<Faculties> optionalFaculty = facultiesRepository.findById(facultyId);

        if (optionalFaculty.isPresent()) {
            facultiesRepository.deleteById(facultyId);
            return true;
        }

        return false;
    }

    public List<Faculties> getFacultyByIdOnList(Long facultyId) {
        return facultiesRepository.findFacultiesById(facultyId);
    }
}
