package com.ticketmanagement.service;

import com.ticketmanagement.domain.Comment;
import com.ticketmanagement.domain.Ticket;
import com.ticketmanagement.domain.TicketStatus;
import com.ticketmanagement.dto.ChangeStatusRequest;
import com.ticketmanagement.dto.CommentResponse;
import com.ticketmanagement.dto.CreateCommentRequest;
import com.ticketmanagement.dto.CreateTicketRequest;
import com.ticketmanagement.dto.TicketDetailResponse;
import com.ticketmanagement.dto.TicketListResponse;
import com.ticketmanagement.dto.TicketResponse;
import com.ticketmanagement.dto.UpdateTicketRequest;
import com.ticketmanagement.exception.ResourceNotFoundException;
import com.ticketmanagement.mapper.TicketMapper;
import com.ticketmanagement.repository.CommentRepository;
import com.ticketmanagement.repository.TicketRepository;
import com.ticketmanagement.statemachine.TicketStatusTransitionPolicy;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;
    private final TicketStatusTransitionPolicy transitionPolicy;

    public TicketService(
            TicketRepository ticketRepository,
            CommentRepository commentRepository,
            TicketStatusTransitionPolicy transitionPolicy) {
        this.ticketRepository = ticketRepository;
        this.commentRepository = commentRepository;
        this.transitionPolicy = transitionPolicy;
    }

    @Transactional
    public TicketResponse create(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.title().trim());
        ticket.setDescription(request.description().trim());
        ticket.setPriority(request.priority());
        ticket.setAssignee(normalizeAssignee(request.assignee()));
        ticket.setStatus(TicketStatus.OPEN);

        Ticket saved = ticketRepository.save(ticket);
        return TicketMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public TicketListResponse list(String keyword, TicketStatus status) {
        String normalizedKeyword = normalizeKeyword(keyword);
        List<TicketResponse> items = ticketRepository.search(normalizedKeyword, status).stream()
                .map(TicketMapper::toResponse)
                .toList();
        return new TicketListResponse(items);
    }

    @Transactional(readOnly = true)
    public TicketDetailResponse getById(UUID id) {
        Ticket ticket = findTicketOrThrow(id);
        List<Comment> comments = commentRepository.findByTicket_IdOrderByCreatedAtAsc(id);
        return TicketMapper.toDetailResponse(ticket, comments);
    }

    @Transactional
    public TicketResponse updateFields(UUID id, UpdateTicketRequest request) {
        if (request.status() != null) {
            throw new IllegalArgumentException(
                    "status cannot be updated through this endpoint; use PATCH /api/v1/tickets/{id}/status");
        }
        if (!hasAnyFieldUpdate(request)) {
            throw new IllegalArgumentException("At least one field must be provided for update");
        }

        Ticket ticket = findTicketOrThrow(id);

        if (request.title() != null) {
            String title = request.title().trim();
            if (title.isEmpty()) {
                throw new IllegalArgumentException("title must not be blank");
            }
            ticket.setTitle(title);
        }
        if (request.description() != null) {
            String description = request.description().trim();
            if (description.isEmpty()) {
                throw new IllegalArgumentException("description must not be blank");
            }
            ticket.setDescription(description);
        }
        if (request.priority() != null) {
            ticket.setPriority(request.priority());
        }
        if (request.assignee() != null) {
            ticket.setAssignee(normalizeAssignee(request.assignee()));
        }

        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketResponse changeStatus(UUID id, ChangeStatusRequest request) {
        Ticket ticket = findTicketOrThrow(id);
        transitionPolicy.assertCanTransition(ticket.getStatus(), request.status());
        ticket.setStatus(request.status());
        return TicketMapper.toResponse(ticketRepository.save(ticket));
    }

    @Transactional
    public CommentResponse addComment(UUID ticketId, CreateCommentRequest request) {
        Ticket ticket = findTicketOrThrow(ticketId);

        Comment comment = new Comment();
        comment.setTicket(ticket);
        comment.setText(request.text().trim());

        Comment saved = commentRepository.save(comment);
        return TicketMapper.toCommentResponse(saved);
    }

    private Ticket findTicketOrThrow(UUID id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + id));
    }

    private static boolean hasAnyFieldUpdate(UpdateTicketRequest request) {
        return request.title() != null
                || request.description() != null
                || request.priority() != null
                || request.assignee() != null;
    }

    private static String normalizeAssignee(String assignee) {
        if (assignee == null) {
            return null;
        }
        String trimmed = assignee.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private static String normalizeKeyword(String keyword) {
        if (keyword == null) {
            return null;
        }
        String trimmed = keyword.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
