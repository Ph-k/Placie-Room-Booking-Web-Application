package com.example.demo.advice;


import com.example.demo.exception.PlacePhotoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PlacePhotoNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PlacePhotoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String PlacePhotoNotFoundHandler(PlacePhotoNotFoundException ex) {
        return ex.getMessage();
    }
}
