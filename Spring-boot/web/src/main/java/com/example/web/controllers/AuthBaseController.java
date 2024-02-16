package com.example.web.controllers;

import com.example.web.RequestsBody.*;
import com.example.web.auth.AuthenticationService;
import com.example.web.exceptions.ErrorResponse;
import com.example.web.mapstruct.CategoriesDTO;
import com.example.web.mapstruct.ProfessorsDTO;
import com.example.web.mapstruct.StudentsDTOs;
import com.example.web.model.*;
import com.example.web.repository.ProfessorRepository;
import com.example.web.responses.ArrayListResponse;
import com.example.web.responses.LoginResponses;
import com.example.web.services.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = {"Authorization", "Content-Type", "X-Requested-With"})
@RestController
@RequestMapping("/private")
public class AuthBaseController {
    private final StudentDetailsService studentDetailsService;
    private final ProfessorDetailsService professorDetailsService;
    private final SuperUserDetailsService superUserDetailsService;
    private final CategoryDetailsServices categoryDetailsServices;
    private final FacultiesService facultiesService;
    private final DepartmentsService departmentsService;
    private final AuthenticationService service;
    private final ProfessorRepository professorRepository;
    private final Logger logger = LoggerFactory.getLogger(AuthBaseController.class);
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$";
    public AuthBaseController(StudentDetailsService studentDetailsService, ProfessorDetailsService professorDetailsService, SuperUserDetailsService superUserDetailsService, CategoryDetailsServices categoryDetailsServices, FacultiesService facultiesService, DepartmentsService departmentsService, AuthenticationService service, ProfessorRepository professorRepository) {
        this.studentDetailsService = studentDetailsService;
        this.professorDetailsService = professorDetailsService;
        this.superUserDetailsService = superUserDetailsService;
        this.categoryDetailsServices = categoryDetailsServices;
        this.facultiesService = facultiesService;
        this.departmentsService = departmentsService;
        this.service = service;
        this.professorRepository = professorRepository;
    }

    @GetMapping("/collections/count")
    public ArrayListResponse getTotalStudents() {
        long countStudents = studentDetailsService.getTotalStudents();
        long countLecturers = professorDetailsService.getTotalLecturers();
        long countAdmin = superUserDetailsService.getTotalAdministrators();
        long countCategories= categoryDetailsServices.getTotalCategories();
        long countFaculties = facultiesService.getTotalFaculties();
        long countDepartments = departmentsService.getTotalDepartments();
        ArrayListResponse arrayListResponse = new ArrayListResponse();
        arrayListResponse.addData("UsersList", countAdmin);
        arrayListResponse.addData("CategoryList", countCategories);
        arrayListResponse.addData("FacultyList", countFaculties);
        arrayListResponse.addData("DepartmentList", countDepartments);
        arrayListResponse.addData("LecturerList", countLecturers);
        arrayListResponse.addData("StudentList", countStudents);
        // Add more data as needed
        return arrayListResponse;
    }

    @GetMapping("/student/list")
    public List<StudentsDTOs> getAllStudentsWithRecords() {
        List<Students> students = studentDetailsService.getAllStudentsWithRecords();
        // Convert entities to DTOs using MapStruct
        List<StudentsDTOs> studentDTOs = students.stream()
                .map(StudentsDTOs::fromEntity)
                .collect(Collectors.toList());

        return studentDTOs;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?>login(@RequestBody SuperUserAuthenticationRequest loginRequest, HttpServletResponse response) {
        // Authenticate the user
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Email is required", "400"));
        }// Check if the email is of valid format using regex
        else if (!loginRequest.getEmail().matches(EMAIL_REGEX)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid email format", "400"));
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Password is required", "400"));
        }
        try {
            LoginResponses responses = service.validateSuperUserAuthentication(loginRequest);
            // Set the token as a cookie
            Cookie cookie = new Cookie("jwtAuth", responses.getToken());
            cookie.setMaxAge(24 * 60 * 60); // Set the cookie expiration time in seconds (e.g., 24 hours)
            cookie.setPath("/"); // Set the cookie path to the root path
            response.addCookie(cookie);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Account not found with email -" + loginRequest.getEmail(), "401"));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<StudentsDTOs> getStudentWithRecords(@PathVariable Long studentId) {
        // Check if studentId is null or empty
        if (studentId == null) {
            throw new IllegalArgumentException("Student ID cannot be null or empty");
        }
        // Check if studentId is an integer
        try {
            Long parsedStudentId = Long.parseLong(String.valueOf(studentId));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid student ID format. Must be an integer");
        }
        StudentsDTOs studentDTO = studentDetailsService.getStudentWithRecordsById(studentId);
        if (studentDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(studentDTO, HttpStatus.OK);
    }

    @PutMapping("/student/update/{studentId}")
    public ResponseEntity<?> updateStudentData(@PathVariable Long studentId, @RequestBody RegisterRequestBody studentData) {
        try {
            StudentsDTOs updatedStudent = studentDetailsService.updateStudentData(studentId, studentData);
            return new ResponseEntity<>("Student Details Successfully updated.", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/student/delete")
    public ResponseEntity<Void> deleteStudent(@RequestBody Map<String, List<String>> requestBody) {
        List<Long> id = requestBody.get("id").stream().map(Long::parseLong).collect(Collectors.toList());
        studentDetailsService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("category/list")
    public ResponseEntity<List<Categories>> getAllCategories() {
        List<Categories> categoriesList = categoryDetailsServices.getAllCategories();
        return new ResponseEntity<>(categoriesList, HttpStatus.OK);
    }
    @PostMapping("/category/new")
    public ResponseEntity<Categories> addCategory(@RequestBody CategoryRequestBody categoryRequestBody) {
        Categories newCategory = categoryDetailsServices.addCategory(categoryRequestBody);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/category/delete/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        categoryDetailsServices.deleteCategoryById(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Categories> getCategoryById(@PathVariable Long categoryId) {
        Optional<Categories> category = categoryDetailsServices.getCategoryById(categoryId);

        return category.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/category/update/{categoryId}")
    public ResponseEntity<Categories> updateCategoryById(@PathVariable Long categoryId, @RequestBody CategoryRequestBody categoryRequestBody) {
        Optional<Categories> updatedCategory = categoryDetailsServices.updateCategoryById(categoryId, categoryRequestBody);

        return updatedCategory.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/category/data")
    public ResponseEntity<Categories> updateCategoryStatusById(@RequestParam Long id, @RequestParam(name = "status") boolean newStatus) {
        Optional<Categories> updatedCategory = categoryDetailsServices.updateCategoryStatus(id, newStatus);

        return updatedCategory.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @GetMapping("/faculties/list")
    public ResponseEntity<List<Faculties>> getAllFaculties() {
        List<Faculties> facultiesList = facultiesService.getAllFaculties();
        return new ResponseEntity<>(facultiesList, HttpStatus.OK);
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<Faculties> getFacultyById(@PathVariable Long facultyId) {
        Optional<Faculties> faculty = facultiesService.getFacultyById(facultyId);
        return faculty.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/faculty/create")
    public ResponseEntity<Faculties> saveFaculty(@RequestBody FacultyRequestBody facultyRequestBody) {
        Faculties newFaculty = facultiesService.saveFaculty(facultyRequestBody);
        return new ResponseEntity<>(newFaculty, HttpStatus.CREATED);
    }

    @PutMapping("/faculty/update/{facultyId}")
    public ResponseEntity<Faculties> updateFaculty(@PathVariable Long facultyId, @RequestBody FacultyRequestBody facultyRequestBody) {
        Optional<Faculties> updatedFaculty = facultiesService.updateFaculty(facultyId, facultyRequestBody);

        return updatedFaculty.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/faculty/delete/{facultyId}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long facultyId) {
        boolean facultyDeleted = facultiesService.deleteFaculty(facultyId);

        return facultyDeleted
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/department/list")
    public List<Departments> getAllDepartments() {
        return departmentsService.getAllDepartments();
    }

    @PostMapping("/department/create")
    public ResponseEntity<Departments> createDepartment(@RequestBody DepartmentRequestBody departmentRequestBody) {
        Departments newDepartment = departmentsService.saveDepartment(departmentRequestBody);
        return new ResponseEntity<>(newDepartment, HttpStatus.CREATED);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<Departments> getDepartmentById(@PathVariable Long departmentId) {
        Optional<Departments> department = departmentsService.getDepartmentById(departmentId);
        return department.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/department/update/{departmentId}")
    public ResponseEntity<Departments> updateDepartment(@PathVariable Long departmentId,  @RequestBody DepartmentRequestBody departmentRequestBody) {
        Optional<Departments> updatedDepartment = departmentsService.updateDepartment(departmentId, departmentRequestBody);
        return updatedDepartment.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/department/delete/{departmentId}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long departmentId) {
        boolean departmentDeleted = departmentsService.deleteDepartment(departmentId);

        return departmentDeleted
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/professors/list")
    public List<ProfessorsDTO> getAllProfessor() {
        List<Professors> professorsList = professorDetailsService.getProfessorsWithRecords();
        List<ProfessorsDTO> professorsDTOS = professorsList.stream()
                .map(ProfessorsDTO::fromEntity)
                .collect(Collectors.toList());

        return professorsDTOS;
    }

    @PostMapping("/professor/add")
    public ResponseEntity<Object> addNewProfessor(@RequestBody ProfessorRequestBody professorRequestBody) {
        //validate data

        // Check if the email is of valid format using regex
        if (!professorRequestBody.getProfessorsDTO().getEmail().matches(EMAIL_REGEX)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid email format", "400"));
        }
        // Check if email already exists
        else if (checkIfEmailAlreadyExists(professorRequestBody.getProfessorsDTO().getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Sorry..! Email already been used by another Professor.", "409"));
        }
        return ResponseEntity.ok(service.createNewProfessor(professorRequestBody));
    }

    @PutMapping("/features/data")
    public ResponseEntity<String> updateProfessorFeatures(@RequestParam Long id, @RequestParam(name = "features") boolean newFeatures) {
        try {
            // Call your service method to update features
            boolean updated = professorDetailsService.updateProfessorFeaturesById(id, newFeatures);

            if (updated) {
                return new ResponseEntity<>("Features updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Professor not found or features were not updated", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/professor/delete")
    public ResponseEntity<Void> deleteProfessor(@RequestBody Map<String, List<String>> requestBody) {
        List<Long> id = requestBody.get("id").stream().map(Long::parseLong).collect(Collectors.toList());
        professorDetailsService.deleteProfessor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    private boolean checkIfEmailAlreadyExists(String email) {
        return professorDetailsService.checkIfEmailAlreadyBeenUsed(email);
    }

}
