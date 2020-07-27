package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(value = "SELECT * FROM message WHERE sender_id=?1", nativeQuery = true)
    List<Message> getSent(Long SenderId);

    @Query(value = "SELECT * FROM message WHERE receiver_id=?1", nativeQuery = true)
    List<Message> getReceived(Long ReceiverId);

    @Query(value = "SELECT * FROM message WHERE receiver_id=?1 OR sender_id=?1", nativeQuery = true)
    List<Message> getAll(Long UserId);

    @Query(value = "SELECT * FROM message WHERE (sender_id=?1 AND receiver_id=?2) OR (sender_id=?2 AND receiver_id=?1);" ,nativeQuery = true)
    List<Message> getBetween(Long User1, Long User2);
}
