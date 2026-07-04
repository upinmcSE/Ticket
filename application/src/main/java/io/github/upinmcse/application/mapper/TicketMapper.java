package io.github.upinmcse.application.mapper;

import io.github.upinmcse.application.model.TicketDTO;
import io.github.upinmcse.application.model.command.CreateTicketCommand;
import io.github.upinmcse.domain.model.entity.Ticket;

public class TicketMapper {
    /**
     * Command -> Entity
     */
    public static Ticket toEntity(CreateTicketCommand cmd) {
        Ticket ticket = new Ticket();

        ticket.setName(cmd.getTitle());
        ticket.setDescription(cmd.getDescription());
        ticket.setStartTime(cmd.getValidFrom());
        ticket.setEndTime(cmd.getValidTo());

        return ticket;
    }

    /**
     * Entity -> DTO
     */
    public static TicketDTO toDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();

        dto.setId(ticket.getId());
        dto.setName(ticket.getName());
        dto.setDescription(ticket.getDescription());
        dto.setStartTime(ticket.getStartTime());
        dto.setEndTime(ticket.getEndTime());
//        dto.setStatus(ticket.getStatus()); // TODO
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());

        return dto;
    }
}
