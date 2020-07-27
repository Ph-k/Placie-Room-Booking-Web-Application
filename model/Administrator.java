package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Administrator {
    private @Id @GeneratedValue Long AdministratorId;

    @NotNull
    private String UserName;

    @NotNull
    private String Password;

    public Administrator(){}

    public Administrator(Long administratorId, String userName, String password) {
        AdministratorId = administratorId;
        UserName = userName;
        Password = password;
    }

    public Long getAdministratorId() {
        return AdministratorId;
    }

    public void setAdministratorId(Long administratorId) {
        AdministratorId = administratorId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
