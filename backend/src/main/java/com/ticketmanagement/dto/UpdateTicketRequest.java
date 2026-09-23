package com.ticketmanagement.dto;

import com.ticketmanagement.domain.TicketPriority;
import com.ticketmanagement.domain.TicketStatus;
import jakarta.validation.constraints.Size;

/**
 * Field update only — status must not be changed here (use change-status API).
 * If {@code status} is present, the service rejects with 400.
 */
public record UpdateTicketRequest(
        @Size(max = 200) String title,
        @Size(max = 10_000) String description,
        TicketPriority priority,
        @Size(max = 100) String assignee,
        TicketStatus status
) {
}
