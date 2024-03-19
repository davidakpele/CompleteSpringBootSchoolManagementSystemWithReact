package com.example.web.RequestsBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequestBody {
    private Long departmentId;
    private Long classId;
    private Long semesterId;
    private String courseCode;
    private String courseTitle;
    private String courseUnit;
    private String courseStatus;
}
