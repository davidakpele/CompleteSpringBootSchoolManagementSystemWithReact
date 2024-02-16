package com.example.web.services;

import com.example.web.model.EntryLevel;
import com.example.web.repository.EntryLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryLevelService {

    private final EntryLevelRepository entryLevelRepository;

    @Autowired
    public EntryLevelService(EntryLevelRepository entryLevelRepository) {
        this.entryLevelRepository = entryLevelRepository;
    }

    public List<EntryLevel> getEntryLevelsByCategoryId(Long categoryId) {
        return entryLevelRepository.findByCategoryId(categoryId);
    }
}

