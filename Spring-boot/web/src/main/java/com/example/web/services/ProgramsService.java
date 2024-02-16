package com.example.web.services;

import com.example.web.model.Programs;
import com.example.web.repository.ProgramsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramsService {

    private final ProgramsRepository programsRepository;

    @Autowired
    public ProgramsService(ProgramsRepository programsRepository) {
        this.programsRepository = programsRepository;
    }

    public List<Programs> getProgramsByCategoryId(Long categoryId) {
        return programsRepository.findProgramsByCategoryId(categoryId);
    }
}

