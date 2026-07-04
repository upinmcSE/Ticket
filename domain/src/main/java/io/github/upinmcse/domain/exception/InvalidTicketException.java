package io.github.upinmcse.domain.exception;

public class InvalidTicketException extends DomainException {

    public InvalidTicketException(TicketErrorCode errorCode) {
        super(errorCode.getCode(), errorCode.getDefaultMessage());
    }

    public InvalidTicketException(TicketErrorCode errorCode, String message) {
        super(errorCode.getCode(), message);
    }
}