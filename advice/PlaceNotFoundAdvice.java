package com.example.demo.advice;

import com.example.demo.exception.PlaceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PlaceNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PlaceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String PlaceNotFoundHandler(PlaceNotFoundException ex) {
        return ex.getMessage();
    }
}
