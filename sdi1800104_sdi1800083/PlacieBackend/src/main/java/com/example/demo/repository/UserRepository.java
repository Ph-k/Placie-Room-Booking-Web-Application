package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM User WHERE user_name=?1", nativeQuery = true)
    User findByUsername(String UName);

    @Query(value = "SELECT * FROM User WHERE email=?1", nativeQuery = true)
    User findByEmail(String email);

    @Modifying
    @Query(value = "UPDATE User SET photo_path = ?1 WHERE user_name = ?2", nativeQuery = true)
    int setPhotoPath(String path, String username);

    @Modifying
    @Query(value = "INSERT INTO user\n" +
            "(`user_id`,\n" +
            "`email`,\n" +
            "`first_name`,\n" +
            "`is_admin`,\n" +
            "`is_host`,\n" +
            "`is_tenant`,\n" +
            "`last_name`,\n" +
            "`password`,\n" +
            "`photo_path`,\n" +
            "`telephone`,\n" +
            "`user_name`)\n" +
            "VALUES\n" +
            "(1,\n" +
            "\"admin@placie.com\",\n" +
            "\"admin\",\n" +
            "1,\n" +
            "1,\n" +
            "1,\n" +
            "\"admin\",\n" +
            "\"$2a$10$csRVIjQ7ahFjcAAnw5WDAO6aEttLEEc0EuzqQsNAHI8InnQ0IO68a\",\n" +
            "null,\n" +
            "\"\",\n" +
            "\"admin\")", nativeQuery = true)
    void insertAdmin();

}
