package io.github.upinmcse.domain.service;

import io.github.upinmcse.domain.model.entity.TicketDetail;

public interface TicketDetailDomainService {
    TicketDetail getTicketDetailById(Long ticketId);
}
