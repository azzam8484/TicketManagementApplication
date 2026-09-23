package com.ticketmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCommentRequest(
        @NotBlank(message = "Comment is required")
        @Size(max = 5_000, message = "Comment must be at most 5000 characters")
        String text
) {
}
