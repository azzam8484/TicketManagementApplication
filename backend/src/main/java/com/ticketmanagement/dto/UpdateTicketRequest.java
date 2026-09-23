package com.ticketmanagement.dto;

import com.ticketmanagement.domain.TicketPriority;
import jakarta.validation.constraints.Size;

/**
 * Field update only — status is not accepted on this DTO (use change-status API).
 */
public record UpdateTicketRequest(
        @Size(max = 200) String title,
        @Size(max = 10_000) String description,
        TicketPriority priority,
        @Size(max = 100) String assignee
) {
}
