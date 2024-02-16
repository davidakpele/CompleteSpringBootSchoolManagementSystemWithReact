package com.example.web.mapstruct;

import com.example.web.model.EntryLevel;
import com.example.web.model.Programs;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EntryLevelDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String entryLevelName;
    private Long categoryId;

    public static EntryLevelDTO fromEntity(EntryLevel entryLevel) {
        return EntryLevelDTO.builder()
                .id(entryLevel.getId())
                .entryLevelName(entryLevel.getEntryLevelName())
                .categoryId(entryLevel.getCategoryId())
                .build();
    }
}
