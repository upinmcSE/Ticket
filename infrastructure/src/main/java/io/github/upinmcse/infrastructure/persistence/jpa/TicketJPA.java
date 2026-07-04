package io.github.upinmcse.infrastructure.persistence.jpa;

import io.github.upinmcse.domain.model.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketJPA extends JpaRepository<Ticket, Long> {
}
