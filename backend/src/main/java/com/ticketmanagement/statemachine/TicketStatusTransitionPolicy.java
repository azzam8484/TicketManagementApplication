package com.ticketmanagement.statemachine;

import com.ticketmanagement.domain.TicketStatus;
import com.ticketmanagement.exception.InvalidStatusTransitionException;
import java.util.Collections;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

/**
 * Enforces ticket status transitions defined in spec/state-machine.md.
 * Backend authority for allowed vs rejected moves.
 */
@Component
public class TicketStatusTransitionPolicy {

    private static final Map<TicketStatus, Set<TicketStatus>> ALLOWED = buildAllowedTransitions();

    private static Map<TicketStatus, Set<TicketStatus>> buildAllowedTransitions() {
        Map<TicketStatus, Set<TicketStatus>> map = new EnumMap<>(TicketStatus.class);
        map.put(TicketStatus.OPEN, EnumSet.of(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED));
        map.put(TicketStatus.IN_PROGRESS, EnumSet.of(TicketStatus.RESOLVED, TicketStatus.CANCELLED));
        map.put(TicketStatus.RESOLVED, EnumSet.of(TicketStatus.CLOSED));
        map.put(TicketStatus.CLOSED, EnumSet.noneOf(TicketStatus.class));
        map.put(TicketStatus.CANCELLED, EnumSet.noneOf(TicketStatus.class));
        return Map.copyOf(map);
    }

    public boolean canTransition(TicketStatus from, TicketStatus to) {
        if (from == null || to == null || from == to) {
            return false;
        }
        return ALLOWED.getOrDefault(from, Set.of()).contains(to);
    }

    public void assertCanTransition(TicketStatus from, TicketStatus to) {
        if (!canTransition(from, to)) {
            throw new InvalidStatusTransitionException(from, to);
        }
    }

    public Set<TicketStatus> allowedNextStatuses(TicketStatus current) {
        if (current == null) {
            return Set.of();
        }
        return Collections.unmodifiableSet(ALLOWED.getOrDefault(current, Set.of()));
    }
}
