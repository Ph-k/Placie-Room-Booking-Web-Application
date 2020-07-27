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

    public Long getUserId() {
        return UserId;
    }

    public String getUserName() {
        return UserName;
    }

    public String getPassword() {
        return Password;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getLastName() {
        return LastName;
    }

    public String getFirstName() {
        return FirstName;
    }

    public String getEMail() {
        return EMail;
    }

    public Short getTelephone() {
        return Telephone;
    }

    public String getPhotoUrl() {
        return PhotoUrl;
    }

    public Boolean getTenant() {
        return IsTenant;
    }

    public Boolean getHost() {
        return IsHost;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public void setEMail(String eMail) {
        this.EMail = eMail;
    }

    public void setTelephone(Short telephone) {
        Telephone = telephone;
    }

    public void setPhotoUrl(String photoUrl) {
        PhotoUrl = photoUrl;
    }

    public void setTenant(Boolean tenant) {
        IsTenant = tenant;
    }

    public void setHost(Boolean host) {
        IsHost = host;
    }
}
