package com.example.web.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.RequestsBody.SemesterRequestBody;
import com.example.web.model.Courses;
import com.example.web.model.Semesters;
import com.example.web.repository.ClassesRepository;
import com.example.web.repository.SemestersRepository;

@Service
public class SemesterServices {

    private final SemestersRepository semestersRepository;

    @Autowired
    public SemesterServices(SemestersRepository semestersRepository) {
        this.semestersRepository = semestersRepository;
    }

    public List<Semesters> getAllSemester() {
        return semestersRepository.findAll();
    }

    public Semesters CreateNewSemester(SemesterRequestBody semesterRequestBody) {
        Semesters semesters = Semesters.builder()
                .ClassId(semesterRequestBody.getClassId())
                .Title(semesterRequestBody.getTitle())
                .parent(semesterRequestBody.getParent())
                .build();
        return semestersRepository.save(semesters);
    }

    public void deleteSemesterById(Long semesterId) {
        semestersRepository.deleteById(semesterId);
    }

    public Optional<Semesters> updateSemesterById(Long semesterId, SemesterRequestBody semesterRequestBody) {
        return semestersRepository.findById(semesterId)
                .map(semester -> {
                    semester.setParent(semesterRequestBody.getParent());
                    semester.setClassId(semesterRequestBody.getClassId());
                    semester.setTitle(semesterRequestBody.getTitle());
                    return semestersRepository.save(semester);
                });
    }

    public boolean isSemesterExists(Long classId, String title) {
        return semestersRepository.existsByClassIdAndTitle(classId, title);
    }

    public Optional<Semesters> getSemesterById(Long semesterId) {
        return semestersRepository.findById(semesterId);
    }
}
