package io.github.upinmcse.controller.http;

import io.github.upinmcse.application.service.ticket.TicketAppService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ticket")
@RequiredArgsConstructor
@Slf4j
public class TicketController {

    private final TicketAppService ticketAppService;

}
