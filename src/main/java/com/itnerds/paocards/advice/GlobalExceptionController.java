package com.itnerds.paocards.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

/**
 * Global exception controller/handler.
 * Any exceptions thrown in the controllers will be routed to this global exception handler.
 */
@ControllerAdvice
public class GlobalExceptionController {

    /**
     * Handles the specific @see {@link ResourceNotFoundException}
     * @param ex
     * @param request
     * @return error message
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorMessage> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage message =  ErrorMessageFactory.createErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                ex.getLocalizedMessage(),
                request.getDescription(false));

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles all exceptions, not handled specifically, like @see {@link GlobalExceptionController#resourceNotFoundException(ResourceNotFoundException, WebRequest)}
     * @param ex
     * @param request
     * @return error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> globalExceptionHandler(Exception ex, WebRequest request) {

        ErrorMessage message = ErrorMessageFactory.createErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                ex.getLocalizedMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}