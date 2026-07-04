package io.github.upinmcse.domain.model.entity;

import io.github.upinmcse.domain.converter.EncryptConverter;
import io.github.upinmcse.domain.model.enums.TicketStatus;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = EncryptConverter.class)
    private String name;
    @Convert(converter = EncryptConverter.class)
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TicketStatus status;

    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
}
