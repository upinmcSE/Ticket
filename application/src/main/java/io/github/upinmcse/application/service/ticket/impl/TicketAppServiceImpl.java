package io.github.upinmcse.application.service.ticket.impl;

import io.github.upinmcse.application.mapper.TicketDetailMapper;
import io.github.upinmcse.application.mapper.TicketMapper;
import io.github.upinmcse.application.model.TicketDTO;
import io.github.upinmcse.application.model.command.CreateTicketCommand;
import io.github.upinmcse.application.model.command.CreateTicketDetailCommand;
import io.github.upinmcse.application.model.command.UpdateTicketCommand;
import io.github.upinmcse.application.service.ticket.TicketAppService;
import io.github.upinmcse.domain.model.entity.Ticket;
import io.github.upinmcse.domain.model.entity.TicketDetail;
import io.github.upinmcse.domain.service.TicketDomainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketAppServiceImpl implements TicketAppService {

    private final TicketDomainService ticketDomainService;

    @Override
    public TicketDTO createTicket(CreateTicketCommand createRequest, CreateTicketDetailCommand createDetailRequest) {
        // 1. Convert Command → Entity (via Mapper)
        Ticket ticket = TicketMapper.toEntity(createRequest);
        TicketDetail ticketDetail = TicketDetailMapper.toEntity(createDetailRequest);

        // 2. Call Domain Service (với business logic validation + persist)
        Ticket createdTicket = ticketDomainService.createTicket(ticket, ticketDetail);

        log.info("Created & cached ticket ID: {}, ticketDetail ID: {}",
                createdTicket.getId(), ticketDetail.getId());

        // 3. Convert Entity → DTO
        return TicketMapper.toDTO(createdTicket);
    }

    @Override
    public TicketDTO getTicketById(Long ticketId) {
        Ticket ticket = ticketDomainService.getTicketById(ticketId);
        TicketDTO dto = TicketMapper.toDTO(ticket);

        return dto;
    }

    @Override
    public TicketDTO updateTicket(Long ticketId, UpdateTicketCommand updateRequest) {
        Ticket updatedTicket = new Ticket();
        updatedTicket.setName(updateRequest.getTitle());
        updatedTicket.setDescription(updateRequest.getDescription());
        updatedTicket.setStartTime(updateRequest.getValidFrom());
        updatedTicket.setEndTime(updateRequest.getValidTo());

        Ticket ticket = ticketDomainService.updateTicket(ticketId, updatedTicket);

        return TicketMapper.toDTO(ticket);
    }

    @Override
    public TicketDTO activeTicket(Long ticketId) {
        Ticket ticket = ticketDomainService.activeTicket(ticketId);
        return TicketMapper.toDTO(ticket);
    }

    @Override
    public TicketDTO inactiveTicket(Long ticketId) {
        Ticket ticket = ticketDomainService.inactiveTicket(ticketId);
        return TicketMapper.toDTO(ticket);
    }

    @Override
    public void deleteTicket(Long ticketId) {
        ticketDomainService.deleteTicket(ticketId);
    }

    @Override
    public List<TicketDTO> getAllActiveTickets() {
        return List.of();
    }
}
