package com.example.web.services;

import com.example.web.RequestsBody.SuperUserDetailsRequestBody;
import com.example.web.mapstruct.StudentsDTOs;
import com.example.web.mapstruct.SuperUserRecordsDTO;
import com.example.web.mapstruct.SuperUsersDTO;
import com.example.web.model.Categories;
import com.example.web.model.Classes;
import com.example.web.model.StudentRecords;
import com.example.web.model.Students;
import com.example.web.model.SuperUserRecords;
import com.example.web.model.SuperUsers;
import com.example.web.repository.SuperUserRecordsRepository;
import com.example.web.repository.SuperUserRepository;
import com.example.web.responses.SuperUserDetailsResponse;

import java.util.ArrayList;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuperUserDetailsService implements UserDetailsService {
    private final SuperUserRepository superUserRepository;
    private final SuperUserRecordsRepository superUserRecordsRepository;
    private final PasswordEncoder passwordEncoder;

    public SuperUserDetailsService(SuperUserRepository superUserRepository,
            SuperUserRecordsRepository superUserRecordsRepository, PasswordEncoder passwordEncoder) {
        this.superUserRepository = superUserRepository;
        this.superUserRecordsRepository = superUserRecordsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SuperUsers superUser = superUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("SuperUser not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(superUser.getEmail())
                .password(superUser.getPassword())
                .roles("ADMIN")
                .build();

    }

    public long getTotalAdministrators() {
        return superUserRepository.count();
    }

    public SuperUsersDTO getUserWithRecordsById(Long userId) {
        SuperUsers sUsers = superUserRepository.findSuperWithRecordsById(userId);

        if (sUsers == null) {
            return null;
        }
        return SuperUsersDTO.fromEntity(sUsers);
    }

    public SuperUsersDTO updateUserDetails(Long userId, SuperUserDetailsRequestBody superUserDetailsRequestBody) {
        // Retrieve the existing student
        SuperUsers existingUser = superUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Update the existing student's data
        existingUser.setEmail(superUserDetailsRequestBody.getSuperUsersDTO().getEmail());
        existingUser.setRole(superUserDetailsRequestBody.getSuperUsersDTO().getRole());
        // Save the updated student where id equals studentId
        SuperUsers updatedUser = superUserRepository.save(existingUser);

        var userid = existingUser.getId();
        // Retrieve the existing record by its ID
        SuperUserRecords existingRecord = superUserRecordsRepository.findBySuperUsersId(userId)
                .orElseThrow(() -> new EntityNotFoundException("User record not found with ID: " + userId));

        /// Update the existing record's data
        existingRecord.setFirstname(superUserDetailsRequestBody.getSuperUserRecordsDTO().getFirstname());
        existingRecord.setSurname(superUserDetailsRequestBody.getSuperUserRecordsDTO().getSurname());
        existingRecord.setDateOfBirth(superUserDetailsRequestBody.getSuperUserRecordsDTO().getDateOfBirth());
        existingRecord.setGender(superUserDetailsRequestBody.getSuperUserRecordsDTO().getGender());
        existingRecord.setMobile(superUserDetailsRequestBody.getSuperUserRecordsDTO().getMobile());

        // Save the updated record
        SuperUserRecords updatedRecord = superUserRecordsRepository.save(existingRecord);

        // Return the updated student DTO
        return SuperUsersDTO.fromEntity(updatedUser);
    }

    public boolean changePassword(Long userId, String oldPassword, String newPassword) {

        // Retrieve the user from the database
        SuperUsers user = superUserRepository.findById(userId).orElse(null);
        if (user == null) {
            return false; // User not found
        }
        // Hash the oldPassword provided by the user and compare with the stored hashed
        // password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return false; // Old password does not match
        }

        // Hash the newPassword before saving
        String hashedNewPassword = passwordEncoder.encode(newPassword);

        // Update the user's password and save
        user.setPassword(hashedNewPassword);
        superUserRepository.save(user);
        return true;
    }

    @Transactional
    public List<SuperUsers> getAllWithSuperUserRecords() {
        return superUserRepository.findAllWithSuperUserRecords();
    }

    public SuperUserDetailsResponse createNewUser(SuperUserDetailsRequestBody requestBody) {
        // Extract data from the request body
        SuperUsersDTO superUsersDTO = requestBody.getSuperUsersDTO();
        SuperUserRecordsDTO superUserRecordsDTO = requestBody.getSuperUserRecordsDTO();
        var createDefaultPasswordForNewUser = "123";
        // Create SuperUsers entity
        SuperUsers superUser = SuperUsers.builder()
                .email(superUsersDTO.getEmail())
                .password(passwordEncoder.encode(createDefaultPasswordForNewUser))
                .role(superUsersDTO.getRole())
                .enabled(true) // Assuming the user is enabled by default
                .build();

        // Save SuperUsers entity
        superUser = superUserRepository.save(superUser);

        // Create SuperUserRecords entity
        SuperUserRecords superUserRecord = SuperUserRecords.builder()
                .superUsers(superUser)
                .firstname(superUserRecordsDTO.getFirstname())
                .surname(superUserRecordsDTO.getSurname())
                .gender(superUserRecordsDTO.getGender())
                .mobile(superUserRecordsDTO.getMobile())
                .dateOfBirth(superUserRecordsDTO.getDateOfBirth())
                .photoUrl(superUserRecordsDTO.getPhotoUrl())
                .build();

        // Save SuperUserRecords entity
        superUserRecord = superUserRecordsRepository.save(superUserRecord);

        // Build response object
        SuperUserDetailsResponse response = SuperUserDetailsResponse.builder()
                .superUsersDTO(superUsersDTO)
                .superUserRecordsDTO(superUserRecordsDTO)
                .build();

        return response;
    }

    public boolean existsByEmail(String email) {
        // Query the repository to find a user with the given email
        Optional<SuperUsers> existingUser = superUserRepository.findByEmail(email);
        // Return true if the user exists, false otherwise
        return existingUser.isPresent();
    }

    @Transactional
    public void deleteUsers(List<Long> id) {
        superUserRecordsRepository.deleteRecordsBySuperRecordsIds(id);
        superUserRepository.deleteSuperUsersByIdIn(id);
    }

}
