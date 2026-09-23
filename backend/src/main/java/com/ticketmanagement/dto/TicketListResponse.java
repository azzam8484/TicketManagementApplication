package com.ticketmanagement.dto;

import java.util.List;

public record TicketListResponse(
        List<TicketResponse> items
) {
}
