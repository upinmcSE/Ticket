package io.github.upinmcse.application.model.command;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateTicketDetailCommand {

    private String name;
    private String description;

    private Integer stockInitial;
    private Integer stockAvailable;

    private BigDecimal priceOriginal;
    private BigDecimal priceFlash;

    private LocalDateTime saleStartTime;
    private LocalDateTime saleEndTime;

    private Boolean stockPrepared;
}
