package io.github.upinmcse.controller.mapper;

import io.github.upinmcse.application.model.command.CreateTicketCommand;
import io.github.upinmcse.application.model.command.CreateTicketDetailCommand;
import io.github.upinmcse.controller.model.dto.CreateTicketDetailRequest;
import io.github.upinmcse.controller.model.dto.CreateTicketRequest;

import java.math.BigDecimal;

/**
 * Controller Layer Mapper
 *
 * Chức năng: Chuyển đổi Request DTO (HTTP) → Command (Application)
 * Quy tắc: Chỉ mapping field + type conversion giữa API format và Application format
 */
public class TicketControllerMapper {

    /**
     * CreateTicketRequest → CreateTicketCommand
     */
    public static CreateTicketCommand toCommand(CreateTicketRequest req) {
        CreateTicketCommand cmd = new CreateTicketCommand();
        cmd.setTitle(req.getName());
        cmd.setDescription(req.getDescription());
        cmd.setValidFrom(req.getStartTime());
        cmd.setValidTo(req.getEndTime());
        return cmd;
    }

    /**
     * CreateTicketDetailRequest → CreateTicketDetailCommand
     *
     * Type conversion: Long → BigDecimal (API dùng Long cho đơn giản,
     * Application dùng BigDecimal cho chính xác tài chính)
     */
    public static CreateTicketDetailCommand toDetailCommand(CreateTicketDetailRequest req) {
        CreateTicketDetailCommand cmd = new CreateTicketDetailCommand();
        cmd.setName(req.getName());
        cmd.setDescription(req.getDescription());
        cmd.setStockInitial(req.getStockInitial());
        cmd.setStockAvailable(req.getStockAvailable());
        cmd.setPriceOriginal(toBigDecimal(req.getPriceOriginal()));
        cmd.setPriceFlash(toBigDecimal(req.getPriceFlash()));
        cmd.setStockPrepared(req.getStockPrepared() != null ? req.getStockPrepared() : false);
        return cmd;
    }

    /**
     * Helper: Long → BigDecimal (null-safe)
     */
    private static BigDecimal toBigDecimal(Long value) {
        return value != null ? BigDecimal.valueOf(value) : null;
    }
}