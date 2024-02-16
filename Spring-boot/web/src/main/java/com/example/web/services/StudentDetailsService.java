package com.example.web.services;

import com.example.web.RequestsBody.RegisterRequestBody;
import com.example.web.mapstruct.StudentsDTOs;
import com.example.web.model.StudentRecords;
import com.example.web.model.Students;
import com.example.web.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentDetailsService implements UserDetailsService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentRecordsRepository studentRecordsRepository;
    @Override
    public UserDetails loadUserByUsername(String matricNumber) throws UsernameNotFoundException {
        Students student = studentRepository.findByMatricNumber(matricNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found with matriculation number: " + matricNumber));

        return org.springframework.security.core.userdetails.User
                .withUsername(student.getMatricNumber())
                .password(student.getPassword())
                .roles("STUDENT")
                .build();
    }

    @Transactional
    public List<Students> getAllStudentsWithRecords() {
        return studentRepository.findAllWithStudentRecords();
    }
    public long getTotalStudents() {
        return studentRepository.count();
    }

    public StudentsDTOs getStudentWithRecordsById(Long studentId) {
        Students student = studentRepository.findStudentWithRecordsById(studentId);

        if (student == null) {
            return null;
        }
        return StudentsDTOs.fromEntity(student);
    }

    public StudentsDTOs updateStudentData(Long studentId, RegisterRequestBody studentData) {
        // Retrieve the existing student
        Students existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + studentId));

        // Update the existing student's data
        existingStudent.setEmail(studentData.getStudentsDTOs().getEmail());
        // Set other properties as needed

        // Save the updated student where id equals studentId
        Students updatedStudent = studentRepository.save(existingStudent);

        var userid = existingStudent.getId();
        // Retrieve the existing record by its ID
        StudentRecords existingRecord = studentRecordsRepository.findByStudentsId(userid)
                .orElseThrow(() -> new EntityNotFoundException("Student record not found with ID: " + studentId));

        /// Update the existing record's data
        existingRecord.setFirstname(studentData.getStudentRecordsDTOs().getFirstname());
        existingRecord.setSurname(studentData.getStudentRecordsDTOs().getSurname());
        existingRecord.setDateOfBirth(studentData.getStudentRecordsDTOs().getDateOfBirth());
        existingRecord.setEmail(studentData.getStudentRecordsDTOs().getEmail());
        existingRecord.setGender(studentData.getStudentRecordsDTOs().getGender());
        existingRecord.setRelationShipStatus(studentData.getStudentRecordsDTOs().getRelationShipStatus());
        existingRecord.setMobile(studentData.getStudentRecordsDTOs().getMobile());

        // Save the updated record
        StudentRecords updatedRecord = studentRecordsRepository.save(existingRecord);

        // Return the updated student DTO
        return StudentsDTOs.fromEntity(updatedStudent);
    }

    @Transactional
    public void deleteStudent(List<Long> id) {
        studentRecordsRepository.deleteRecordsByStudentIds(id);
        studentRepository.deleteStudentByIdIn(id);
    }
}
