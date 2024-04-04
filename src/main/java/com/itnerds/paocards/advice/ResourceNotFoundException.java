package com.itnerds.paocards.advice;

/**
 * Used when a REST resource could not be found.
 *
 * @author Jaron Kahalani
 */
public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}