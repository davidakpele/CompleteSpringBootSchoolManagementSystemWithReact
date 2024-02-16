package com.example.web.services;

import com.example.web.model.Categories;
import com.example.web.model.Professors;
import com.example.web.model.Students;
import com.example.web.repository.ProfessorRecordsRepository;
import com.example.web.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
            return false; // Professor not found
        }
    }

    @Transactional
    public void deleteProfessor(List<Long> id) {
        professorRecordsRepository.deleteRecordsByProfessorsIds(id);
        professorRepository.deleteProfessorByIdIn(id);
    }
}
