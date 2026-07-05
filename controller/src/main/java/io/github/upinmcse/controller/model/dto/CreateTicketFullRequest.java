package io.github.upinmcse.controller.model.dto;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class CreateTicketFullRequest {
    @Valid
    private CreateTicketRequest ticket;

    @Valid
    private CreateTicketDetailRequest detail;
}