package com.ticketmanagement.controller;

import com.ticketmanagement.domain.TicketStatus;
import com.ticketmanagement.dto.ChangeStatusRequest;
import com.ticketmanagement.dto.CommentResponse;
import com.ticketmanagement.dto.CreateCommentRequest;
import com.ticketmanagement.dto.CreateTicketRequest;
import com.ticketmanagement.dto.TicketDetailResponse;
import com.ticketmanagement.dto.TicketListResponse;
import com.ticketmanagement.dto.TicketResponse;
import com.ticketmanagement.dto.UpdateTicketRequest;
import com.ticketmanagement.service.TicketService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<TicketResponse> create(@Valid @RequestBody CreateTicketRequest request) {
        TicketResponse created = ticketService.create(request);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public TicketListResponse list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) TicketStatus status) {
        return ticketService.list(keyword, status);
    }

    @GetMapping("/{id}")
    public TicketDetailResponse getById(@PathVariable UUID id) {
        return ticketService.getById(id);
    }

    @PatchMapping("/{id}")
    public TicketResponse updateFields(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTicketRequest request) {
        return ticketService.updateFields(id, request);
    }

    @PatchMapping("/{id}/status")
    public TicketResponse changeStatus(
            @PathVariable UUID id,
            @Valid @RequestBody ChangeStatusRequest request) {
        return ticketService.changeStatus(id, request);
    }

    @PostMapping("/{id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse addComment(
            @PathVariable UUID id,
            @Valid @RequestBody CreateCommentRequest request) {
        return ticketService.addComment(id, request);
    }
}
