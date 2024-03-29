package com.example.web.RequestsBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacultyRequestBody {
    private Long categoryId;
    private String facultyName;
}
