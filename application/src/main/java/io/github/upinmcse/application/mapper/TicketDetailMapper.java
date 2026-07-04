package io.github.upinmcse.application.mapper;

import io.github.upinmcse.application.model.TicketDetailDTO;
import io.github.upinmcse.application.model.command.CreateTicketDetailCommand;
import io.github.upinmcse.domain.model.entity.TicketDetail;

public class TicketDetailMapper {

    /**
     * Command → Entity
     */
    public static TicketDetail toEntity(CreateTicketDetailCommand cmd) {
        TicketDetail detail = new TicketDetail();

        detail.setName(cmd.getName());
        detail.setDescription(cmd.getDescription());
        detail.setStockInitial(cmd.getStockInitial());
        detail.setStockAvailable(cmd.getStockAvailable());
        detail.setPriceOriginal(cmd.getPriceOriginal());
        detail.setPriceFlash(cmd.getPriceFlash());
        detail.setSaleStartTime(cmd.getSaleStartTime());
        detail.setSaleEndTime(cmd.getSaleEndTime());
        detail.setStockPrepared(cmd.getStockPrepared());

        return detail;
    }

    /**
     * Entity → DTO
     */
    public static TicketDetailDTO toDTO(TicketDetail ticketDetail) {
        if (ticketDetail == null) return null;

        TicketDetailDTO dto = new TicketDetailDTO();
        dto.setId(ticketDetail.getId());
        dto.setName(ticketDetail.getName());
        dto.setStockInitial(ticketDetail.getStockInitial());
        dto.setStockAvailable(ticketDetail.getStockAvailable());
        dto.setStockPrepared(ticketDetail.isStockPrepared());
        dto.setPriceOriginal(ticketDetail.getPriceOriginal().longValue());
        dto.setPriceFlash(ticketDetail.getPriceFlash().longValue());
        dto.setSaleStartTime(ticketDetail.getSaleStartTime());
        dto.setSaleEndTime(ticketDetail.getSaleEndTime());
//        dto.setStatus(ticketDetail.getStatus()); // TODO
        dto.setActivityId(ticketDetail.getActivityId());
        dto.setVersion(null); // set by optimistic locking if needed

        return dto;
    }
}
