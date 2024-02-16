package com.example.web.responses;

import java.util.HashMap;
import java.util.Map;

public class ArrayListResponse {
    private Map<String, Object> data;

    public ArrayListResponse() {
        this.data = new HashMap<>();
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void addData(String key, Object value) {
        this.data.put(key, value);
    }
}
