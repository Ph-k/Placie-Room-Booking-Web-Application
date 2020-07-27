package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;


@Data
@Entity
public class Message {
    private @Id @GeneratedValue Long MessageId;

    @Column(nullable = false)
    private Long SenderId;

    @Column(nullable = false)
    private Long ReceiverId;

    @Column(nullable = false)
    private String Text;


    private Date Date;


    public Message(){}

    public Message(Long senderId, Long receiverId, String text,Date date) {
        SenderId = senderId;
        ReceiverId = receiverId;
        Text = text;
        Date = date;
    }

}
