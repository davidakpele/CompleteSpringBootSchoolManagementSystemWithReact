package com.example.web.RequestsBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubjectRequestBody {
    private Long courseId;
    private String courseCode;
    private String subjectname;
}
