package com.ticketmanagement.dto;

import java.time.Instant;
import java.util.UUID;

public record CommentResponse(
        UUID id,
        UUID ticketId,
        String text,
        Instant createdAt
) {
}
