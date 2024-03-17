package com.example.web.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.RequestsBody.CourseRequestBody;
import com.example.web.model.Courses;
import com.example.web.model.Subjects;
import com.example.web.repository.ClassesRepository;
import com.example.web.repository.CoursesRepository;

import jakarta.transaction.Transactional;

@Service
public class CourseServices {
    
    private final CoursesRepository coursesRepository;
    
    @Autowired
    public CourseServices(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    public List<Courses> getAllCourses() {
        return coursesRepository.findAll();
    }

    public Courses CreateNewCourse(CourseRequestBody courseRequestBody) {
        Courses courses = Courses.builder()
                .departmentId(courseRequestBody.getDepartmentId())
                .classId(courseRequestBody.getClassId())
                .semesterId(courseRequestBody.getSemesterId())
                .courseCode(courseRequestBody.getCourseCode())
                .courseTitle(courseRequestBody.getCourseTitle())
                .courseUnit(courseRequestBody.getCourseUnit())
                .courseStatus(courseRequestBody.getCourseStatus())
                .build();
        return coursesRepository.save(courses);
    }

    public void deleteCourseById(Long courseId) {
        coursesRepository.deleteById(courseId);
    }


    public Optional<Courses> updateCourseById(Long courseId, CourseRequestBody courseRequestBody) {
        return coursesRepository.findById(courseId)
                .map(course -> {
                    course.setDepartmentId(courseRequestBody.getDepartmentId());
                    course.setClassId(courseRequestBody.getClassId());
                    course.setSemesterId(courseRequestBody.getSemesterId());
                    course.setCourseCode(courseRequestBody.getCourseCode());
                    course.setCourseTitle(courseRequestBody.getCourseTitle());
                    course.setCourseUnit(courseRequestBody.getCourseUnit());
                    course.setCourseStatus(courseRequestBody.getCourseStatus());
                    return coursesRepository.save(course);
                });
    }

    @Transactional
    public void deleteCourseByIds(List<Long> id) {
        coursesRepository.deleteByIdIn(id);
    }

    public Optional<Courses> getCourseById(Long courseId) {
        return coursesRepository.findById(courseId);
    }
}
