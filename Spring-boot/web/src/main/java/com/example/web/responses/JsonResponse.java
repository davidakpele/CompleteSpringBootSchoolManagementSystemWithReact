package com.example.web.responses;

import com.example.web.mapstruct.FacultiesDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Builder
public class JsonResponse<T> {
    private String message;
    private T data;


    public JsonResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public JsonResponse(List<Object[]> facultiesDTOList) {
    }
}
