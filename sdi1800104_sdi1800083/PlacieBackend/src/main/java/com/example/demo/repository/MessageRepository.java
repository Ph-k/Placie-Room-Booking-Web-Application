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

    /*@Query(value = "SELECT m.* , u.user_name FROM message m, user u WHERE (m.receiver_id=?1 AND m.sender_id=u.user_id) OR (m.sender_id=?1 AND m.receiver_id=u.user_id);", nativeQuery = true)
    List<Message> getAll(Long UserId);*/

    @Query(value = "SELECT * FROM message WHERE receiver_id=?1 OR sender_id=?1", nativeQuery = true)
    List<Message> getAll(Long UserId);

    @Query(value = "SELECT DISTINCT(u.user_name) FROM message m, user u WHERE (m.receiver_id=?1 AND m.sender_id=u.user_id) OR (m.sender_id=?1 AND m.receiver_id=u.user_id);", nativeQuery = true)
    List<String> getContactedUsers(Long UserId);

    @Query(value = "SELECT * FROM message WHERE (sender_id=?1 AND receiver_id=?2) OR (sender_id=?2 AND receiver_id=?1);" ,nativeQuery = true)
    List<Message> getBetween(Long User1, Long User2);

    /*@Query(value = "SELECT m.* , u.user_name FROM message m, user u " +
                   "WHERE (m.sender_id=1 AND m.receiver_id=25 AND u.user_id=m.sender_id) " +
                   "OR (m.sender_id=25 AND m.receiver_id=1 AND u.user_id=m.sender_id);" ,nativeQuery = true)
    List<Message> getBetween(Long User1, Long User2);*/

}
