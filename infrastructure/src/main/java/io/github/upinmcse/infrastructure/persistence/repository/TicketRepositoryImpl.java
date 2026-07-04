package io.github.upinmcse.infrastructure.persistence.repository;


import io.github.upinmcse.domain.model.entity.Ticket;
import io.github.upinmcse.domain.repository.TicketRepository;
import io.github.upinmcse.infrastructure.persistence.jpa.TicketJPA;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TicketRepositoryImpl implements TicketRepository {

    private final TicketJPA ticketJPA;

    @Override
    public Page<Ticket> getAllActiveTickets(Pageable page) {
        log.info("Finding all active tickets");
        return null;
    }

    @Override
    public Ticket save(Ticket ticket) {
        log.info("Saving ticket: {}", ticket.getName());
        return ticketJPA.save(ticket);
    }

    @Override
    public Ticket update(Ticket ticket) {
        log.info("Updating ticket: {}", ticket.getId());
        return ticketJPA.save(ticket);
    }

    @Override
    public Optional<Ticket> findById(Long id) {
        log.info("Finding ticket: {}", id);
        return ticketJPA.findById(id);
    }

    @Override
    public void deleteTicket(Long ticketId) {
        log.info("Soft deleting ticket: {}", ticketId);
        Optional<Ticket> optionalTicket = ticketJPA.findById(ticketId);
    }
}
