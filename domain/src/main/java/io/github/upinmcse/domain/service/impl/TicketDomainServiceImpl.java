package io.github.upinmcse.domain.service.impl;


import io.github.upinmcse.domain.exception.InvalidTicketDetailException;
import io.github.upinmcse.domain.exception.InvalidTicketException;
import io.github.upinmcse.domain.exception.TicketErrorCode;
import io.github.upinmcse.domain.exception.TicketNotFoundException;
import io.github.upinmcse.domain.model.entity.Ticket;
import io.github.upinmcse.domain.model.entity.TicketDetail;
import io.github.upinmcse.domain.model.enums.TicketStatus;
import io.github.upinmcse.domain.repository.TicketDetailRepository;
import io.github.upinmcse.domain.repository.TicketRepository;
import io.github.upinmcse.domain.service.TicketDomainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class TicketDomainServiceImpl implements TicketDomainService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketDetailRepository ticketDetailRepository;

    @Override
    public Ticket createTicket(Ticket ticket, TicketDetail ticketDetail) {
        // 1. Validate Ticket information
        this.validateTicketCreation(ticket);

        // 2. Set audit fields for Ticket
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        ticket.setStatus(TicketStatus.ACTIVE);

        // 3. Persist Ticket
        Ticket savedTicket = ticketRepository.save(ticket);

        // 4. Create default TicketDetail
        ticketDetail.setActivityId(savedTicket.getId());
        ticketDetail.setCreatedAt(LocalDateTime.now());
        ticketDetail.setUpdatedAt(LocalDateTime.now());
        ticketDetail.setStatus(TicketStatus.ACTIVE);

        // Set defaults for nullable fields that DB requires NOT NULL
        if (ticketDetail.getPriceFlash() == null) {
            ticketDetail.setPriceFlash(ticketDetail.getPriceOriginal() != null
                    ? ticketDetail.getPriceOriginal().multiply(BigDecimal.valueOf(0.7)) // TODO change
                    : BigDecimal.ZERO);
        }
        if (ticketDetail.getSaleStartTime() == null) {
            ticketDetail.setSaleStartTime(LocalDateTime.now());
        }
        if (ticketDetail.getSaleEndTime() == null) {
            ticketDetail.setSaleEndTime(ticketDetail.getSaleStartTime().plusDays(30)); // TODO change
        }

        // Validate TicketDetail
        this.validateTicketDetailCreation(ticketDetail);

        // 5. Persist TicketDetail
        ticketDetailRepository.save(ticketDetail);

        log.info("Created ticket with ID: {} and default TicketDetail", savedTicket.getId());
        return savedTicket;
    }

    @Override
    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException(ticketId));
    }

    @Override
    public Ticket updateTicket(Long ticketId, Ticket ticket) {
        return null;
    }

    @Override
    public Ticket activeTicket(Long ticketId) {
        return null;
    }

    @Override
    public Ticket inactiveTicket(Long ticketId) {
        return null;
    }

    @Override
    public void deleteTicket(Long ticketId) {

    }

    @Override
    public Page<Ticket> getAllActiveTickets(Pageable page) {
        log.info("Domain Service: Getting all active tickets");
        return null;
    }

    // ========== VALIDATION METHODS ==========

    /**
     * Validate business rules for ticket creation
     */
    private void validateTicketCreation(Ticket ticket) {
        // Rule 1: Name không được trống
        if (ticket.getName() == null || ticket.getName().trim().isEmpty()) {
            throw new InvalidTicketException(TicketErrorCode.NAME_EMPTY);
        }

        if (ticket.getName().length() > 255) {
            throw new InvalidTicketException(TicketErrorCode.NAME_TOO_LONG);
        }

        // Rule 2: Description độ dài hợp lệ
        if (ticket.getDescription() != null && ticket.getDescription().length() > 500) {
            throw new InvalidTicketException(TicketErrorCode.DESCRIPTION_TOO_LONG);
        }

        // Rule 3: startTime phải trước endTime
        if (ticket.getStartTime() != null && ticket.getEndTime() != null) {
            if (ticket.getStartTime().isAfter(ticket.getEndTime())) {
                throw new InvalidTicketException(TicketErrorCode.START_AFTER_END);
            }
        }

        // Rule 4: startTime không được trong quá khứ
        if (ticket.getStartTime() != null && ticket.getStartTime().isBefore(LocalDateTime.now())) {
            throw new InvalidTicketException(TicketErrorCode.START_IN_PAST);
        }
    }

    /**
     * Validate business rules for ticket update
     */
    private void validateTicketUpdate(Ticket existingTicket, Ticket updatedTicket) {
        this.validateTicketCreation(updatedTicket);

        // Additional rule: Cannot update if ticket is DELETED (status = 2)
//        if (existingTicket.getStatus() == 2) {
//            throw new IllegalArgumentException("Cannot update deleted ticket");
//        }
    }

    /**
     * Validate business rules for TicketDetail creation
     */
    private void validateTicketDetailCreation(TicketDetail ticketDetail) {
        // Rule 1: Name không được trống
        if (ticketDetail.getName() == null || ticketDetail.getName().trim().isEmpty()) {
            throw new InvalidTicketDetailException(TicketErrorCode.DETAIL_NAME_EMPTY);
        }

        // Rule 2: Stock initial phải > 0
        if (ticketDetail.getStockInitial() <= 0) {
            throw new InvalidTicketDetailException(TicketErrorCode.STOCK_INITIAL_INVALID);
        }

        // Rule 3: Stock available không vượt quá stock initial
        if (ticketDetail.getStockAvailable() > ticketDetail.getStockInitial()) {
            throw new InvalidTicketDetailException(TicketErrorCode.STOCK_AVAILABLE_EXCEEDS_INITIAL);
        }

        // Rule 4: Price original phải > 0
        if (ticketDetail.getPriceOriginal() == null
                || ticketDetail.getPriceOriginal().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTicketDetailException(TicketErrorCode.PRICE_ORIGINAL_INVALID);
        }

        // Rule 5: Sale time validation
        if (ticketDetail.getSaleStartTime() != null && ticketDetail.getSaleEndTime() != null) {
            if (ticketDetail.getSaleStartTime().isAfter(ticketDetail.getSaleEndTime())) {
                throw new InvalidTicketDetailException(TicketErrorCode.SALE_START_AFTER_END);
            }
        }
    }
}
