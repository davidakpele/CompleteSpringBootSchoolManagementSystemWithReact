package com.example.web.mapstruct;

import com.example.web.model.Students;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentsDTOs {
    @Id
    private Long id;
    private String matricNumber;
    private Long role;
    private String email;
    @JsonIgnore  // Exclude the password field from JSON serialization
    private String password;

    @JsonManagedReference
    private List<StudentRecordsDTOs> records;
    
    public static StudentsDTOs fromEntity(Students students) {
        StudentsDTOs userDto = new StudentsDTOs();
        userDto.setId(students.getId());
        userDto.setEmail(students.getEmail());
        userDto.setPassword(students.getPassword());
        userDto.setMatricNumber(students.getMatricNumber());
        userDto.setRole(students.getRole());
        List<StudentRecordsDTOs> recordsDTOs = students.getStudentRecords()
                .stream()
                .map(StudentRecordsDTOs::fromEntity)
                .collect(Collectors.toList());
        // Set other fields as needed
        userDto.setRecords(recordsDTOs);
        return userDto;
    }
}