package com.example.demo.advice;

import com.example.demo.exception.PendingHostNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PendingHostNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PendingHostNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String PendingHostNotFoundHandler(PendingHostNotFoundException ex) {
        return ex.getMessage();
    }
}
