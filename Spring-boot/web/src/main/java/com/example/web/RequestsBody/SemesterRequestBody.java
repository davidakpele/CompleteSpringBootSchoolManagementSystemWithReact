package com.example.web.RequestsBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SemesterRequestBody {
    private Long parent;
    private Long classId;
    private String title;
}
