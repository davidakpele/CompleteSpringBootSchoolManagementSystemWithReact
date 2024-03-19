package com.example.web.auth;


import com.example.web.RequestsBody.LoginRequestBody;
import com.example.web.RequestsBody.ProfessorRequestBody;
import com.example.web.RequestsBody.RegisterRequestBody;
import com.example.web.RequestsBody.SuperUserAuthenticationRequest;
import com.example.web.config.JwtService;
import com.example.web.mapstruct.ProfessorsDTO;
import com.example.web.mapstruct.StudentsDTOs;
import com.example.web.mapstruct.SuperUsersDTO;
import com.example.web.model.*;
import com.example.web.repository.*;
import com.example.web.responses.AuthenticationResponse;
import com.example.web.responses.LoginResponses;
import com.example.web.services.RoleService;
import com.example.web.services.UniqueIdGeneratorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
@Lazy
@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;
    private final RoleService roleService;
    private final UniqueIdGeneratorService uniqueIdGeneratorService;
    private static final String FOLDER_NAME = "pl";
    private static final int EXPIRATION_MINUTES = 10;
    @Autowired
    private HttpServletRequest request;
    private Date expirationTime;
    private final StudentRepository studentRepository;
    private final StudentRecordsRepository studentRecordsRepository;
    private final SuperUserRepository superUserRepository;
    private final SuperUserRecordsRepository superUserRecordsRepository;
    private final ProfessorRepository professorRepository;
    private final ProfessorRecordsRepository professorRecordsRepository;

    public AuthenticationResponse register(RegisterRequestBody registerRequestBody) {
        Long nextUserId = getNextStudentId();
        StudentsDTOs studentsDTOs = registerRequestBody.getStudentsDTOs();
        if (studentsDTOs == null) {
            // Handle the case where studentsDTOs is null
            throw new IllegalArgumentException("StudentsDTOs is null");
        }
        var setSurnameToBeDefaultPassword = registerRequestBody.getStudentRecordsDTOs().getSurname().toLowerCase();
        // Find the role with clearance "Student"
        Optional<Role> role = roleService.findRoleByClearance("STUDENT");
        Role studentRole = role.orElseThrow(() -> new NoSuchElementException("Role not found for clearance: Student"));

        var user = Students.builder()
                .id(nextUserId)
                .email(registerRequestBody.getStudentsDTOs().getEmail())
                .matricNumber(generateMatricNumber())
                .password(passwordEncoder.encode(setSurnameToBeDefaultPassword))
                    .role(studentRole .getId())
                .build();
        user.setId(nextUserId);
        studentRepository.save(user);
        // Retrieve the saved user to get the user ID
        Students savedUser = (Students) studentRepository.findByEmail(registerRequestBody.getStudentsDTOs().getEmail()).orElseThrow(() -> new AuthenticationServiceException("User not found"));
        // Create a verification token
        UUID verificationToken = UUID.randomUUID();
        expirationTime = calculateExpirationDate(EXPIRATION_MINUTES);
        VerificationToken tokenEntity = VerificationToken.builder()
                .token(String.valueOf(verificationToken))
                .id(nextUserId)
                .expirationTime(expirationTime)
                .target(studentRole .getId())
                .build();
        verificationTokenRepository.save(tokenEntity);

        // Save data into the records table
        StudentRecords record = StudentRecords.builder()
                .students(savedUser)
                .applicationId(registerRequestBody.getStudentRecordsDTOs().getApplicationId())
                .facultyId(registerRequestBody.getStudentRecordsDTOs().getFacultyId())
                .departmentId(registerRequestBody.getStudentRecordsDTOs().getDepartmentId())
                .programId(registerRequestBody.getStudentRecordsDTOs().getProgramId())
                .nationalIdentificationNumber(registerRequestBody.getStudentRecordsDTOs().getNationalIdentificationNumber())
                .entryLevel(registerRequestBody.getStudentRecordsDTOs().getEntryLevel())
                .firstname(registerRequestBody.getStudentRecordsDTOs().getFirstname())
                .surname(registerRequestBody.getStudentRecordsDTOs().getSurname())
                .dateOfBirth(registerRequestBody.getStudentRecordsDTOs().getDateOfBirth())
                .email(registerRequestBody.getStudentRecordsDTOs().getEmail())
                .gender(registerRequestBody.getStudentRecordsDTOs().getGender())
                .relationShipStatus(registerRequestBody.getStudentRecordsDTOs().getRelationShipStatus())
                .mobile(registerRequestBody.getStudentRecordsDTOs().getMobile())
                .build();

        // Save the record using the generic save method
        studentRecordsRepository.save(record);
        // Generate the verification link using applicationUrl()
        String verificationLink = applicationUrl() + "/auth/verifyRegistration?token=" + verificationToken;
        String msg = "Verification mail has been sent to the email you provided. Please verify email to continue application. If you have used a wrong email, please fill the form again with a valid email address.";
        // Log the verification link in the console
        log.info("Verification link: " + verificationLink);
        // Send the verification link to the user (you can implement this part)
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .status(String.valueOf(200))
                .name(registerRequestBody.getStudentRecordsDTOs().getFirstname())
                .VerificationLink(verificationLink)
                .message(msg)
                .build();
    }

    public LoginResponses authenticate(LoginRequestBody request) {

            var studentInfo = studentRepository.findByMatricNumberAndEnabledTrue(request.getMatricnumber())
                    .orElseThrow(() -> new AuthenticationServiceException("Student not found with matriculation number: " + request.getMatricnumber()));
            if (studentInfo.isEnabled()) {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getMatricnumber(),
                                request.getPassword()
                        )
                );
                var user = studentRecordsRepository.findByStudentsId(studentInfo.getId())
                        .orElseThrow(() -> new AuthenticationServiceException("User records not found"));

                var jwtToken = jwtService.generateToken((UserDetails) studentInfo);
                return LoginResponses.builder()
                        .token(jwtToken)
                        .id(String.valueOf(studentInfo.getId()))
                        .name(user.getFirstname())
                        .message("Successful")
                        .status(String.valueOf(200))
                        .build();
            }else{
                // Account is not verified
                return LoginResponses.builder()
                        .status(String.valueOf(401)) // Unauthorized
                        .message("Account not verified")
                        .build();
            }
    }

    public String verifyUser(String token) {
        // Find the verification token
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        var WhosTarget= verificationToken.getTarget();
        if (verificationToken ==null){
            return "invalid";
        }

        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime() - cal.getTime().getTime() < 0)){
            // Delete the verification token
            //verificationTokenRepository.delete(verificationToken);
            return "expired";
        }
       // Find the user by ID
        if (WhosTarget.toString().equals("2")){
            //professor
            Professors professors = professorRepository.findById(verificationToken.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            professors.setEnabled(true);
            verificationTokenRepository.delete(verificationToken);
            professorRepository.save(professors);
            return "valid";
        } else if (WhosTarget.toString().equals("3")) {
            //student
            Students user = studentRepository.findById(verificationToken.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setEnabled(true);
            verificationTokenRepository.delete(verificationToken);
            studentRepository.save(user);
        }
        return "valid";
    }

    public VerificationTokenResult generateNewVerificationToken(String oldToken) {

        VerificationToken verificationToken = verificationTokenRepository.findByToken(oldToken);
        if (verificationToken == null) {
            return new VerificationTokenResult(false, "Token not found");
        }

        // Update expirationTime (adjust this based on your requirements)
        Date newExpirationTime = calculateExpirationDate(EXPIRATION_MINUTES);
        verificationToken.setExpirationTime(newExpirationTime);

        // Generate a new token
        verificationToken.setToken(UUID.randomUUID().toString());

        // Save the updated verification token
        verificationTokenRepository.save(verificationToken);

        return new VerificationTokenResult(true, verificationToken);
    }

    public String generateMatricNumber() {
        int length = 9;
        String number = "1234567890";
        int numberLength = number.length();
        Random random = new Random();
        StringBuilder randomNumber = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(numberLength);
            randomNumber.append(number.charAt(randomIndex));
        }
        return "MCU" + randomNumber.toString();
    }

    public void resendVerificationTokenMail(Long user, VerificationToken verificationToken) {
        // Generate the verification link using applicationUrl()
        String verificationLink = applicationUrl() + "/auth/verifyRegistration?token=" + verificationToken.getToken();

        // Log the verification link in the console
        log.info("Verification link: " + verificationLink);
    }
    private String generateRandomNumber() {
        // Generate a random 3-digit number
        Random random = new Random();
        int randomInt = random.nextInt(900) + 100; // generates a random number between 100 and 999
        return String.valueOf(randomInt);
    }

    private Long getNextStudentId() {
        List<Students> existingUsers = studentRepository.findAll();
        Students newUser = new Students();
        if (existingUsers.isEmpty()) {
            newUser.setId(1001L);
        } else {
            // Find the maximum existing user ID
            Long maxId = existingUsers.stream()
                    .map(Students::getId)
                    .max(Long::compare)
                    .orElse(0L);
            // Set the new user ID
            newUser.setId(maxId + 1);
        }
        return newUser.getId(); // If the table is empty, start from 1001
    }

    private Long getNextProfessorId() {
        List<Professors> existingUsers = professorRepository.findAll();
        Students newUser = new Students();
        if (existingUsers.isEmpty()) {
            newUser.setId(1001L);
        } else {
            // Find the maximum existing user ID
            Long maxId = existingUsers.stream()
                    .map(Professors::getId)
                    .max(Long::compare)
                    .orElse(0L);
            // Set the new user ID
            newUser.setId(maxId + 1);
        }
        return newUser.getId(); // If the table is empty, start from 1001
    }


    public String applicationUrl() {
        String protocol = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        return protocol + "://" + serverName + ":" + serverPort + contextPath;
    }

    private Date calculateExpirationDate(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, expirationMinutes);
        return new Date(calendar.getTime().getTime());
    }

    //Admin Area
    public LoginResponses validateSuperUserAuthentication(SuperUserAuthenticationRequest request) {

        var userInfo = superUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationServiceException("User not found: " + request.getEmail()));


        if (!userInfo.isEnabled()) {
            throw new AuthenticationServiceException("User account is not enabled");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = superUserRecordsRepository.findById(userInfo.getId())
                .orElseThrow(() -> new AuthenticationServiceException("User records not found"));

        var jwtToken = jwtService.generateToken((UserDetails) userInfo);

        return LoginResponses.builder()
                .token(jwtToken)
                .id(String.valueOf(userInfo.getId()))
                .name(user.getFirstname())
                .message("administrator")
                .role(String.valueOf(userInfo.getRole()))
                .status(String.valueOf(200))
                .build();
    }

    public Object createNewProfessor(ProfessorRequestBody professorRequestBody) {
        ProfessorsDTO professorsDTO = professorRequestBody.getProfessorsDTO();
        if (professorsDTO == null) {
            // Handle the case where studentsDTOs is null
            throw new IllegalArgumentException("ProfessorsDTO is null");
        }
        var createDefaultPasswordForProfessor = "123";
        Optional<Role> role = roleService.findRoleByClearance("PROFESSOR");
        Role professorRole = role.orElseThrow(() -> new NoSuchElementException("Role not found for clearance: Professor"));
        Long nextId = getNextProfessorId();

        var user = Professors.builder()
                .Id(nextId)
                .accessCode(uniqueIdGeneratorService.generateUniqueId())
                .email(professorRequestBody.getProfessorsDTO().getEmail())
                .password(passwordEncoder.encode(createDefaultPasswordForProfessor))
                .role(professorRole.getId())
                .build();
        user.setId(nextId);
        professorRepository.save(user);
        // Create a verification token
        UUID verificationToken = UUID.randomUUID();
        expirationTime = calculateExpirationDate(EXPIRATION_MINUTES);
        VerificationToken tokenEntity = VerificationToken.builder()
                .token(String.valueOf(verificationToken))
                .id(nextId)
                .expirationTime(expirationTime)
                .target(professorRole.getId())
                .build();
        verificationTokenRepository.save(tokenEntity);

        Professors savedUser = (Professors) professorRepository.findByEmail(professorRequestBody.getProfessorsDTO().getEmail()).orElseThrow(() -> new AuthenticationServiceException("User not found"));
        ProfessorRecords professorRecords = ProfessorRecords.builder()
                .professors(savedUser)
                .firstname(professorRequestBody.getProfessorRecordsDTO().getFirstname())
                .surname(professorRequestBody.getProfessorRecordsDTO().getSurname())
                .mobile(professorRequestBody.getProfessorRecordsDTO().getMobile())
                .dateOfBirth(professorRequestBody.getProfessorRecordsDTO().getDateOfBirth())
                .gender(professorRequestBody.getProfessorRecordsDTO().getGender())
                .relationshipStatus(professorRequestBody.getProfessorRecordsDTO().getRelationshipStatus())
                .nationalIdentificationNumber(professorRequestBody.getProfessorRecordsDTO().getNationalIdentificationNumber())
                .religion(professorRequestBody.getProfessorRecordsDTO().getReligion())
                .bloodType(professorRequestBody.getProfessorRecordsDTO().getBloodType())
                .address(professorRequestBody.getProfessorRecordsDTO().getAddress())
                .photoUrl(professorRequestBody.getProfessorRecordsDTO().getPhotoUrl())
                .qualification(professorRequestBody.getProfessorRecordsDTO().getQualification())
                .build();
        professorRecordsRepository.save(professorRecords);
        // Generate the verification link using applicationUrl()
        String verificationLink = applicationUrl() + "/auth/verifyRegistration?token=" + verificationToken;
        String msg = "Verification mail has been sent to the email you provided. Please verify email to continue application. If you have used a wrong email, please fill the form again with a valid email address.";
        // Send the verification link to the user (you can implement this part)
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .status(String.valueOf(200))
                .VerificationLink(verificationLink)
                .build();
    }

    public String createOrGetFolderPath() {
        // Get the current working directory
        String currentDirectory = System.getProperty("user.dir");

        // Create the folder path
        String folderPath = currentDirectory + "/" + FOLDER_NAME;

        // Create a Path object
        Path path = Paths.get(folderPath);

        // Check if the folder exists, and create it if it doesn't
        if (Files.notExists(path)) {
            try {
                Files.createDirectories(path);
                System.out.println("Folder created: " + folderPath);
            } catch (Exception e) {
                e.printStackTrace();
                // Handle the exception accordingly
            }
        } else {
            System.out.println("Folder already exists: " + folderPath);
        }

        return folderPath;
    }

  
}