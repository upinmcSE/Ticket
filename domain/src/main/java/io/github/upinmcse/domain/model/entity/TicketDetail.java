package io.github.upinmcse.domain.model.entity;

import io.github.upinmcse.domain.converter.EncryptConverter;
import io.github.upinmcse.domain.model.enums.TicketStatus;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ticket_item")
public class TicketDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = EncryptConverter.class)
    private String name;

    @Convert(converter = EncryptConverter.class)
    private String description;

    private int stockInitial;               // Số lượng vé ban đầu
    private int stockAvailable;             // Số lượng vé còn lại
    private boolean isStockPrepared;        // Đã chuẩn bị kho?
    private BigDecimal priceOriginal;       // Giá gốc
    private BigDecimal priceFlash;          // Giá flash sale
    private LocalDateTime saleStartTime;    // Thời gian bắt đầu bán
    private LocalDateTime saleEndTime;      // Thời gian kết thúc bán
    private TicketStatus status;            // INACTIVE, ACTIVE, DELETED
    private Long activityId;                // Có thể là FK tới Ticket
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
