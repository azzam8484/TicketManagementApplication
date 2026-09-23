package com.ticketmanagement.dto;

import com.ticketmanagement.domain.TicketStatus;
import jakarta.validation.constraints.NotNull;

public record ChangeStatusRequest(
        @NotNull TicketStatus status
) {
}
