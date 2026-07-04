package io.github.upinmcse.application.model.command;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateTicketCommand {
    private String title;
    private String description;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private BigDecimal price;
    private Boolean active;
}
