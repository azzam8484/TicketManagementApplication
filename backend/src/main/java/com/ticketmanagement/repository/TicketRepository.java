package com.ticketmanagement.repository;

import com.ticketmanagement.domain.Ticket;
import com.ticketmanagement.domain.TicketStatus;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    List<Ticket> findAllByOrderByCreatedAtDesc();

    List<Ticket> findByStatusOrderByCreatedAtDesc(TicketStatus status);

    /**
     * List tickets with optional keyword (title/description, case-insensitive)
     * and optional status filter. Both null = all tickets.
     */
    @Query("""
            SELECT t FROM Ticket t
            WHERE (:status IS NULL OR t.status = :status)
              AND (
                   :keyword IS NULL
                   OR LOWER(t.title) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%'))
                   OR LOWER(t.description) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%'))
              )
            ORDER BY t.createdAt DESC
            """)
    List<Ticket> search(
            @Param("keyword") String keyword,
            @Param("status") TicketStatus status);
}
