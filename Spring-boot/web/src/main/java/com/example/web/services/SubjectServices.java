package com.example.web.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.web.RequestsBody.SubjectRequestBody;
import com.example.web.model.Subjects;
import com.example.web.repository.SubjectsRepository;

@Service
public class SubjectServices {
    private final SubjectsRepository subjectsRepository;

    @Autowired
    public SubjectServices(SubjectsRepository subjectsRepository) {
        this.subjectsRepository = subjectsRepository;
    }

    public List<Subjects> getAllSubject() {
        return subjectsRepository.findAll();
    }

    public Subjects CreateNewSubject(SubjectRequestBody subjectRequestBody) {
        Subjects subjects = Subjects.builder()
                .courseId(subjectRequestBody.getCourseId())
                .courseCode(subjectRequestBody.getCourseCode())
                .subjectname(subjectRequestBody.getSubjectname())
                .build();
        return subjectsRepository.save(subjects);
    }

    public void deleteSubjectById(Long subjectId) {
        subjectsRepository.deleteById(subjectId);
    }

    public Optional<Subjects> updateSubjectById(Long subjectId, SubjectRequestBody subjectRequestBody) {
        return subjectsRepository.findById(subjectId)
                .map(subject -> {
                    subject.setCourseId(subjectRequestBody.getCourseId());
                    subject.setCourseCode(subjectRequestBody.getCourseCode());
                    subject.setSubjectname(subjectRequestBody.getSubjectname());
                    return subjectsRepository.save(subject);
                });
    }
}
