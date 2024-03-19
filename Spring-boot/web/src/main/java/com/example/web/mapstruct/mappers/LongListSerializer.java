package com.example.web.mapstruct.mappers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;

public class LongListSerializer extends JsonSerializer<List<Long>> {

    @Override
    public void serialize(List<Long> value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value != null) {
            gen.writeString(String.join(",", value.stream().map(String::valueOf).toArray(String[]::new)));
        }
    }
}

