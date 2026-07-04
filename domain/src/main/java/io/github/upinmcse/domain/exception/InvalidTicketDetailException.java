package io.github.upinmcse.domain.exception;

public class InvalidTicketDetailException extends DomainException {

    public InvalidTicketDetailException(TicketErrorCode errorCode) {
        super(errorCode.getCode(), errorCode.getDefaultMessage());
    }

    public InvalidTicketDetailException(TicketErrorCode errorCode, String message) {
        super(errorCode.getCode(), message);
    }
}