package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class User {
    private @Id @GeneratedValue Long UserId;

    @NotNull
    private String UserName;

    @NotNull
    private String Password;

    @NotNull
    private String FirstName;

    @NotNull
    private String LastName;

    @NotNull
    private String EMail;

    @NotNull
    private Short Telephone;

    private String PhotoUrl;

    @NotNull
    private Boolean IsTenant;

    @NotNull
    private Boolean IsHost;

    public User(){}

    public User(String userName, String password, String firstName, String lastName, String email,
                Short telephone, String photoUrl, Boolean isTenant, Boolean isHost){
        UserName = userName;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        EMail = email;
        Telephone = telephone;
        PhotoUrl = photoUrl;
        IsTenant = isTenant;
        IsHost = isHost;
    }

}
