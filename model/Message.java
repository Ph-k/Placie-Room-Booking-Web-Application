package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;


@Data
@Entity
public class Message {
    private @Id @GeneratedValue Long MessageId;

    @NotNull
    private Long SenderId;

    @NotNull
    private Long ReceiverId;

    @NotNull
    private String Text;


    private Date Date;


    public Message(){}

    public Message(Long messageId, Long senderId, Long receiverId, String text,Date date) {
        MessageId = messageId;
        SenderId = senderId;
        ReceiverId = receiverId;
        Text = text;
        Date = date;
    }

}
