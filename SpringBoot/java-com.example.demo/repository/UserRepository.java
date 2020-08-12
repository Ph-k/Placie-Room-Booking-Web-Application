package com.example.demo.repository;

import com.example.demo.model.Review;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM User WHERE user_name=?1", nativeQuery = true)
    User findByUsername(String UName);
    
    @Query(value = "SELECT * FROM User WHERE email=?1", nativeQuery = true)
    User findByEmail(String email);
}
