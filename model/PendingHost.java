package com.example.demo.model;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class PendingHost {
    private @Id Long UserId;

    public PendingHost() {}

    public PendingHost(Long userId) {
        UserId = userId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public Long getUserId() {
        return UserId;
    }
}
