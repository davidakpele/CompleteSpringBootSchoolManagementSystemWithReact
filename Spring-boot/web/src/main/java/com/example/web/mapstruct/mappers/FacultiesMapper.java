package com.example.web.mapstruct.mappers;

import com.example.web.mapstruct.FacultiesDTO;
import com.example.web.model.Faculties;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FacultiesMapper {
    FacultiesDTO toDto(Faculties faculties);
    List<FacultiesDTO> toDtoList(List<Faculties> facultiesList);
}

