package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class User {
    private @Id @GeneratedValue Long UserId;

    @Column(nullable = false)
    private String UserName;

    @Column(nullable = false)
    private String Password;

    @Column(nullable = false)
    private String FirstName;

    @Column(nullable = false)
    private String LastName;

    @Column(nullable = false)
    private String EMail;

    @Column(nullable = false)
    private Long Telephone;

    private String PhotoUrl;

    @Column(nullable = false)
    private Boolean IsTenant;

    @Column(nullable = false)
    private Boolean IsHost;

    @Column(nullable = false)
    private  Boolean IsAdmin;

    public User(){}

    public User(String userName, String password, String firstName, String lastName, String email,
                Long telephone, String photoUrl, Boolean isTenant, Boolean isHost, Boolean isAdmin){
        UserName = userName;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        EMail = email;
        Telephone = telephone;
        PhotoUrl = photoUrl;
        IsTenant = isTenant;
        IsHost = isHost;
        IsAdmin = isAdmin;
    }

}
