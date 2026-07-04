package io.github.upinmcse.domain.repository;

import io.github.upinmcse.domain.model.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TicketRepository {
    Page<Ticket> getAllActiveTickets(Pageable page);

    Ticket save(Ticket ticket);

    Ticket update(Ticket ticket);

    Optional<Ticket> findById(Long id);

    /**
     * Xoá ticket (Soft Delete)
     * - Set status = 2 (DELETED)
     * - Delete tất cả TicketDetail liên quan (soft delete)
     *
     * @param ticketId
     * @throws RuntimeException nếu ticket không tồn tại
     */
    void deleteTicket(Long ticketId);
}
