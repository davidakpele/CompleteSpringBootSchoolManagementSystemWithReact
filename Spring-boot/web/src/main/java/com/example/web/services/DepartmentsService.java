package com.example.web.services;

import com.example.web.RequestsBody.DepartmentRequestBody;
import com.example.web.model.Departments;
import com.example.web.model.Faculties;
import com.example.web.repository.DepartmentsRepository;
import com.example.web.repository.FacultiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentsService {

    private final DepartmentsRepository departmentsRepository;
    private final FacultiesRepository facultiesRepository;
    @Autowired
    public DepartmentsService(DepartmentsRepository departmentsRepository, FacultiesRepository facultiesRepository) {
        this.departmentsRepository = departmentsRepository;
        this.facultiesRepository = facultiesRepository;
    }

    public List<Departments> getDepartmentsByFacultyId(Long facultyId) {
        return departmentsRepository.findDepartmentsByFacultyId(facultyId);
    }

    public long getTotalDepartments() {
        return departmentsRepository.count();
    }


    public List<Departments> getAllDepartments() {
        return departmentsRepository.findAll();
    }

    public Optional<Departments> getDepartmentById(Long departmentId) {
        return departmentsRepository.findById(departmentId);
    }


    public boolean deleteDepartment(Long departmentId) {
        if (departmentsRepository.existsById(departmentId)) {
            departmentsRepository.deleteById(departmentId);
            return true;
        }
        return false;
    }

    public Departments saveDepartment(DepartmentRequestBody departmentRequestBody) {
        Departments newDepartment = Departments.builder()
                .facultyId(departmentRequestBody.getFacultyId())
                .departmentName(departmentRequestBody.getDepartmentName())
                .build();
        return departmentsRepository.save(newDepartment);
    }


    public Optional<Departments> updateDepartment(Long departmentId, DepartmentRequestBody departmentRequestBody) {
        Optional<Departments> optionalDepartment = departmentsRepository.findById(departmentId);

        return optionalDepartment.map(existingDepartment -> {
            existingDepartment.setFacultyId(departmentRequestBody.getFacultyId());
            existingDepartment.setDepartmentName(departmentRequestBody.getDepartmentName());
            return departmentsRepository.save(existingDepartment);
        });
    }

    public List<Departments> findDepartmentsByIdIn(List<Long> departmentIdList) {
        return departmentsRepository.findByIdIn(departmentIdList);
    }
}

