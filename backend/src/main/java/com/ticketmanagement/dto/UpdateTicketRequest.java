package com.ticketmanagement.dto;

import com.ticketmanagement.domain.TicketPriority;
import com.ticketmanagement.domain.TicketStatus;
import jakarta.validation.constraints.Size;

/**
 * Field update only — status must not be changed here (use change-status API).
 * If {@code status} is present, the service rejects with 400.
 */
public record UpdateTicketRequest(
        @Size(max = 200, message = "Title must be at most 200 characters")
        String title,
        @Size(max = 10_000, message = "Description must be at most 10000 characters")
        String description,
        TicketPriority priority,
        @Size(max = 100, message = "Assignee must be at most 100 characters")
        String assignee,
        TicketStatus status
) {
}
