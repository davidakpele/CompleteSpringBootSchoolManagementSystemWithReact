package com.example.web.services;

import com.example.web.RequestsBody.ProfessorRequestBody;
import com.example.web.RequestsBody.SchoolManagementAuthenticationRequestBody;
import com.example.web.config.JwtService;
import com.example.web.controllers.AuthBaseController;
import com.example.web.mapstruct.ProfessorWithCategoriesDTO;
import com.example.web.mapstruct.ProfessorsDTO;
import com.example.web.mapstruct.StudentsDTOs;
import com.example.web.model.Categories;
import com.example.web.model.ProfessorRecords;
import com.example.web.model.Professors;
import com.example.web.model.Students;
import com.example.web.repository.CategoriesRepository;
import com.example.web.repository.ProfessorRecordsRepository;
import com.example.web.repository.ProfessorRepository;
import com.example.web.responses.LoginResponses;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProfessorDetailsService implements UserDetailsService {
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private ProfessorRecordsRepository professorRecordsRepository;
    @Autowired
    private CategoriesRepository categoriesRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    private final Logger logger = LoggerFactory.getLogger(ProfessorDetailsService.class);
    @Override
    public UserDetails loadUserByUsername(String accessCode) throws UsernameNotFoundException {
        Professors professor = professorRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new UsernameNotFoundException("Professor not found with access code: " + accessCode));

        return org.springframework.security.core.userdetails.User
                .withUsername(professor.getAccessCode())
                .password(professor.getPassword())
                .roles("PROFESSOR")
                .build();
    }

    public long getTotalLecturers() {
        return professorRepository.count();
    }

    @Transactional
    public List<Professors> getProfessorsWithRecords() {
        return professorRepository.findAllWithProfessorRecords();
    }

    public boolean checkIfEmailAlreadyBeenUsed(String email) {
        long emailCount = professorRepository.countByEmail(email);
        return emailCount > 0;
    }

    public boolean updateProfessorFeaturesById(Long id, boolean newFeatures) {
        Optional<Professors> optionalProfessor = professorRepository.findById(id);

        if (optionalProfessor.isPresent()) {
            Professors professor = optionalProfessor.get();
            professor.setFeatures(newFeatures);
            professorRepository.save(professor);
            return true; // Updated successfully
        } else {
            return false;
        }
    }

    @Transactional
    public void deleteProfessor(List<Long> id) {
        professorRecordsRepository.deleteRecordsByProfessorsIds(id);
        professorRepository.deleteProfessorByIdIn(id);
    }

    public ProfessorsDTO getProfessorWithRecordsById(Long professorId) {
        Professors professors = professorRepository.findProfessorWithRecordsById(professorId);

        if (professors == null) {
            return null;
        }
        return ProfessorsDTO.fromEntity(professors);
    }

    public boolean updateProfessorAndRecordsById(Long professorId, ProfessorRequestBody request) {
        Optional<Professors> updatedProfessor = professorRepository.findById(professorId)
                .map(professor -> {
                    // Update professor fields here
                    professor.setEmail(request.getProfessorsDTO().getEmail());

                    // Update related records (assuming a OneToMany relationship)
                    if (professor.getProfessorRecords() != null) {
                        professor.getProfessorRecords().forEach(record -> {
                            // Update record fields here
                            record.setGender(request.getProfessorRecordsDTO().getGender());
                            record.setMobile(request.getProfessorRecordsDTO().getMobile());
                            record.setDateOfBirth(request.getProfessorRecordsDTO().getDateOfBirth());
                            record.setAddress(request.getProfessorRecordsDTO().getAddress());
                            record.setBloodType(request.getProfessorRecordsDTO().getBloodType());
                            record.setNationalIdentificationNumber(request.getProfessorRecordsDTO().getNationalIdentificationNumber());
                            record.setQualification(request.getProfessorRecordsDTO().getQualification());
                            record.setReligion(request.getProfessorRecordsDTO().getReligion());
                            record.setRelationshipStatus(request.getProfessorRecordsDTO().getRelationshipStatus());
                            record.setFirstname(request.getProfessorRecordsDTO().getFirstname());
                            record.setSurname(request.getProfessorRecordsDTO().getSurname());
                        });
                    }
                    return professorRepository.save(professor);
                });

        return updatedProfessor.isPresent(); // Return true if present, false otherwise
    }

    public ProfessorWithCategoriesDTO getProfessorWithCategoriesById(Long professorId) {
        ProfessorRecords professorRecords = professorRecordsRepository.findByProfessorId(professorId)
                .orElseThrow(() -> new EntityNotFoundException("ProfessorRecords not found with ID: " + professorId));

        List<Categories> categories = categoriesRepository.findAllCategoriesWithFeatures();

        return new ProfessorWithCategoriesDTO(
                professorRecords.getProfessors().getId(),
                professorRecords.getSurname(),
                professorRecords.getFirstname(),
                categories,
                false
        );
    }

    public Optional<ProfessorRecords> findByProfessorId(Long professorId) {
        return professorRecordsRepository.findByProfessorId(professorId);
    }

    public LoginResponses authenticate(SchoolManagementAuthenticationRequestBody request) {
         var userInfo = professorRepository.findByAccessCode(request.getAccesscode())
                .orElseThrow(() -> new AuthenticationServiceException("User not found: " + request.getAccesscode()));
         if (!userInfo.isFeatures()) {
            return LoginResponses.builder()
                     .message("Account has been disabled")
                     .status(String.valueOf(403)) // HTTP 403 Forbidden status code
                     .build();
         }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getAccesscode(),
                        request.getPassword()
                )
        );
        var user = professorRecordsRepository.findByProfessorId(userInfo.getId())
                .orElseThrow(() -> new AuthenticationServiceException("User records not found"));

        var jwtToken = jwtService.generateToken((UserDetails) userInfo);

        return LoginResponses.builder()
                .token(jwtToken)
                .id(String.valueOf(userInfo.getId()))
                .name(user.getFirstname())
                .message("professor")
                .role(String.valueOf(userInfo.getRole()))
                .status(String.valueOf(200))
                .build();
    }
}
