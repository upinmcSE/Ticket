package io.github.upinmcse.domain.exception;

public class TicketNotFoundException extends DomainException {

    public TicketNotFoundException(Long ticketId) {
        super(TicketErrorCode.NOT_FOUND.getCode(),
                TicketErrorCode.NOT_FOUND.getDefaultMessage() + ": " + ticketId);
    }
}