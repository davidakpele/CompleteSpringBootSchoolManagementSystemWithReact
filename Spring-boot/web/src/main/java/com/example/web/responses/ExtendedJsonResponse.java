package com.example.web.responses;

import com.example.web.mapstruct.FacultiesDTO;

import java.util.List;

public class ExtendedJsonResponse<T> {
    public ExtendedJsonResponse(List<FacultiesDTO> facultiesDTOList) {
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getFriendRequestCount() {
        return friendRequestCount;
    }

    public void setFriendRequestCount(int friendRequestCount) {
        this.friendRequestCount = friendRequestCount;
    }

    private List<T> data;
    private int friendRequestCount;

    public ExtendedJsonResponse(List<T> data, int friendRequestCount) {
        this.data = data;
        this.friendRequestCount = friendRequestCount;
    }
}

