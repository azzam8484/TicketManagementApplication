package com.ticketmanagement.mapper;

import com.ticketmanagement.domain.Comment;
import com.ticketmanagement.domain.Ticket;
import com.ticketmanagement.dto.CommentResponse;
import com.ticketmanagement.dto.TicketDetailResponse;
import com.ticketmanagement.dto.TicketResponse;
import java.util.List;

public final class TicketMapper {

    private TicketMapper() {
    }

    public static TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getStatus(),
                ticket.getPriority(),
                ticket.getAssignee(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt());
    }

    public static CommentResponse toCommentResponse(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getTicket().getId(),
                comment.getText(),
                comment.getCreatedAt());
    }

    public static TicketDetailResponse toDetailResponse(Ticket ticket, List<Comment> comments) {
        List<CommentResponse> commentResponses = comments.stream()
                .map(TicketMapper::toCommentResponse)
                .toList();
        return new TicketDetailResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getStatus(),
                ticket.getPriority(),
                ticket.getAssignee(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                commentResponses);
    }
}
