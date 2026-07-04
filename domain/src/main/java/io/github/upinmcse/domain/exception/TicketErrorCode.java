package io.github.upinmcse.domain.exception;

public enum TicketErrorCode {
    NAME_EMPTY("TICKET_001", "Ticket name cannot be empty"),
    NAME_TOO_LONG("TICKET_002", "Ticket name cannot exceed 255 characters"),
    DESCRIPTION_TOO_LONG("TICKET_003", "Description cannot exceed 500 characters"),
    START_AFTER_END("TICKET_004", "Start time must be before end time"),
    START_IN_PAST("TICKET_005", "Start time cannot be in the past"),

    DETAIL_NAME_EMPTY("TICKET_DETAIL_001", "TicketDetail name cannot be empty"),
    STOCK_INITIAL_INVALID("TICKET_DETAIL_002", "Stock initial must be greater than 0"),
    STOCK_AVAILABLE_EXCEEDS_INITIAL("TICKET_DETAIL_003", "Stock available cannot exceed stock initial"),
    PRICE_ORIGINAL_INVALID("TICKET_DETAIL_004", "Price original must be greater than 0"),
    SALE_START_AFTER_END("TICKET_DETAIL_005", "Sale start time must be before sale end time"),

    NOT_FOUND("TICKET_404", "Ticket not found");

    private final String code;
    private final String defaultMessage;

    TicketErrorCode(String code, String defaultMessage) {
        this.code = code;
        this.defaultMessage = defaultMessage;
    }

    public String getCode() {
        return code;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}