package com.example.web.controllers;

import com.example.web.RequestsBody.LoginRequestBody;
import com.example.web.RequestsBody.RegisterRequestBody;
import com.example.web.auth.AuthenticationService;
import com.example.web.auth.VerificationTokenResult;
import com.example.web.exceptions.ErrorResponse;
import com.example.web.model.Students;

import com.example.web.repository.StudentRepository;
import com.example.web.responses.LoginResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserController {

    private final AuthenticationService service;
    private final StudentRepository studentRepository;
    // Regex pattern for basic email validation
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$";

    public UserController(AuthenticationService service, StudentRepository studentRepository) {
        this.service = service;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequestBody registerRequestBody) {
        if (registerRequestBody.getStudentRecordsDTOs().getApplicationId().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Select Your Application Type", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getFacultyId().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Select Your Prefer Faculty", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getDepartmentId().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Select Your Course Type.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getProgramId().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Select Your Program Aim.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getNationalIdentificationNumber().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Enter Your National Identification Number.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getEntryLevel().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Select Your Entry Level.", "409"));
        }

        //Get personal Data Now
        if (registerRequestBody.getStudentRecordsDTOs().getFirstname().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Enter Your Firstname.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getSurname().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Enter Your Surname", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getSurname().equals(registerRequestBody.getStudentRecordsDTOs().getFirstname())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Unaccepted Data.. Please Firstname can't be the same with your Surname", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getDateOfBirth().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Provide Your Date Of Birth.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getGender().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Select Your Gender.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getEmail().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Enter Your Email Address.", "409"));
        }
        // Check if the email is of valid format using regex
        else if (!registerRequestBody.getStudentRecordsDTOs().getEmail().matches(EMAIL_REGEX)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid email format", "400"));
        }
        // Check if email already exists
        else if (emailExists(registerRequestBody.getStudentRecordsDTOs().getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Sorry..! Email already been used by another Student.", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getRelationShipStatus().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Select Your Relationship Status", "409"));
        }
        if (registerRequestBody.getStudentRecordsDTOs().getMobile().isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Please Enter Your Mobile Number.", "409"));
        }

        return ResponseEntity.ok(service.register(registerRequestBody));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequestBody request, HttpServletResponse response) {
        // Check if email or password is empty
        if (request.getMatricnumber() == null || request.getMatricnumber().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Matric Number is required", "400"));
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Password is required", "400"));
        }
        try {
            LoginResponses responses = service.authenticate(request);
            // Set the token as a cookie
            Cookie cookie = new Cookie("authToken", responses.getToken());
            cookie.setMaxAge(24 * 60 * 60); // Set the cookie expiration time in seconds (e.g., 24 hours)
            cookie.setPath("/"); // Set the cookie path to the root path
            response.addCookie(cookie);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Student not found with matriculation number: -" + request.getMatricnumber(), "401"));
        }
    }
    // Helper method to check if email already exists

    private boolean emailExists(String email) {
        Optional<Object> existingUsers =  studentRepository.findByEmail(email);
        return existingUsers.isPresent();
    }

    @GetMapping("/verifyRegistration")
    public ResponseEntity<Object> verifyRegistration(@RequestParam("token") String token) {
        String result=service.verifyUser(token);
        if (result.equalsIgnoreCase("valid")){
            return ResponseEntity.ok("User registration verified successfully");
        } else if (result.equalsIgnoreCase("expired")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Verification token has expired, Click the resend button to have a new token assign to you.", "400"));
        } else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid verification token", "400"));
        }
    }

    @GetMapping("/resendVerifyToken")
    public ResponseEntity<Object> resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest request) {
        VerificationTokenResult response = service.generateNewVerificationToken(oldToken);

        if (response.equals("failure")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Clear the authentication-related cookies
        Cookie authTokenCookie = new Cookie("authToken", null);
        authTokenCookie.setMaxAge(0);
        authTokenCookie.setPath("/");
        response.addCookie(authTokenCookie);
        return ResponseEntity.ok("Logged out successfully");
    }

}
