package io.github.upinmcse.domain.service;

import io.github.upinmcse.domain.model.entity.Ticket;
import io.github.upinmcse.domain.model.entity.TicketDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketDomainService {
    /**
     * Tạo ticket mới + TicketDetail ban đầu
     *
     * Business Logic:
     * - Validate ticket information
     * - Generate unique ticket ID
     * - Create default TicketDetail item
     *
     * @param ticket Ticket entity
     * @param ticketDetail Default TicketDetail
     * @return Ticket đã được lưu (kèm ID)
     * @throws IllegalArgumentException nếu validation thất bại
     */
    Ticket createTicket(Ticket ticket, TicketDetail ticketDetail);

    /**
     * Lấy thông tin ticket
     * @param ticketId
     * @return Ticket
     * @throws RuntimeException nếu ticket không tồn tại
     */
    Ticket getTicketById(Long ticketId);

    /**
     * Cập nhật ticket
     *
     * Business Logic:
     * - Validate new information
     * - Update ticket fields
     * - Update all related TicketDetail items if needed
     *
     * @param ticketId
     * @param ticket Updated ticket data
     * @return Ticket đã được cập nhật
     * @throws IllegalArgumentException nếu validation thất bại
     * @throws RuntimeException nếu ticket không tồn tại
     */
    Ticket updateTicket(Long ticketId, Ticket ticket);

    /**
     * Kích hoạt ticket
     * - Set status = 1 (ACTIVE)
     * - Activate tất cả TicketDetail liên quan
     *
     * @param ticketId
     * @return Ticket đã kích hoạt
     */
    Ticket activeTicket(Long ticketId);

    /**
     * Vô hiệu hóa ticket
     * - Set status = 0 (INACTIVE)
     * - Deactivate tất cả TicketDetail liên quan
     *
     * @param ticketId
     * @return Ticket đã vô hiệu hóa
     */
    Ticket inactiveTicket(Long ticketId);

    /**
     * Xoá ticket (Soft Delete)
     * - Set status = 2 (DELETED)
     * - Delete tất cả TicketDetail liên quan (soft delete)
     *
     * @param ticketId
     * @throws RuntimeException nếu ticket không tồn tại
     */
    void deleteTicket(Long ticketId);

    Page<Ticket> getAllActiveTickets(Pageable page);
}
