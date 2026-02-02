package com.github.thiago_lima_costa.imageliteapi.application.jwt;

public class InvalidTokenException  extends RuntimeException{
    public InvalidTokenException(String message) {
        super(message);
    }
}
