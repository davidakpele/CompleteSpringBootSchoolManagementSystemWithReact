package com.example.web.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.RequestsBody.ClassRequestBody;
import com.example.web.model.Classes;
import com.example.web.repository.ClassesRepository;

import jakarta.transaction.Transactional;

@Service
public class ClassServices {
    private final ClassesRepository classesRepository;
    
    @Autowired
    public ClassServices(ClassesRepository classesRepository) {
        this.classesRepository = classesRepository;
    }

    public List<Classes> getAllClass() {
        return classesRepository.findAll();
    }

    public Classes CreateNewClass(ClassRequestBody classRequestBody) {
        Classes classes = Classes.builder()
                .Title(classRequestBody.getClassName())
                .build();
        return classesRepository.save(classes);
    }

    @Transactional
    public void deleteClassesByIds(List<Long> id) {
        classesRepository.deleteByIdIn(id);
    }

    public Optional<Classes> updateClassById(Long classId, ClassRequestBody classRequestBody) {
        return classesRepository.findById(classId)
                .map(classes -> {
                    classes.setTitle(classRequestBody.getClassName());
                    return classesRepository.save(classes);
                });
    }

    public Optional<Classes> getClassById(Long classId) {
        return classesRepository.findById(classId);
    }
    
    
}
