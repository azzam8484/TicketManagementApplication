package com.ticketmanagement.statemachine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.ticketmanagement.domain.TicketStatus;
import com.ticketmanagement.exception.InvalidStatusTransitionException;
import java.util.Set;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class TicketStatusTransitionPolicyTest {

    private TicketStatusTransitionPolicy policy;

    @BeforeEach
    void setUp() {
        policy = new TicketStatusTransitionPolicy();
    }

    @ParameterizedTest
    @MethodSource("allowedTransitions")
    void canTransition_allowed_returnsTrue(TicketStatus from, TicketStatus to) {
        assertTrue(policy.canTransition(from, to));
        policy.assertCanTransition(from, to);
    }

    @ParameterizedTest
    @MethodSource("rejectedTransitions")
    void canTransition_rejected_returnsFalse(TicketStatus from, TicketStatus to) {
        assertFalse(policy.canTransition(from, to));
        assertThrows(InvalidStatusTransitionException.class, () -> policy.assertCanTransition(from, to));
    }

    @Test
    void allowedNextStatuses_matchesStateMachineHelper() {
        assertEquals(Set.of(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED), policy.allowedNextStatuses(TicketStatus.OPEN));
        assertEquals(Set.of(TicketStatus.RESOLVED, TicketStatus.CANCELLED), policy.allowedNextStatuses(TicketStatus.IN_PROGRESS));
        assertEquals(Set.of(TicketStatus.CLOSED), policy.allowedNextStatuses(TicketStatus.RESOLVED));
        assertEquals(Set.of(), policy.allowedNextStatuses(TicketStatus.CLOSED));
        assertEquals(Set.of(), policy.allowedNextStatuses(TicketStatus.CANCELLED));
    }

    @Test
    void canTransition_sameStatus_rejected() {
        assertFalse(policy.canTransition(TicketStatus.OPEN, TicketStatus.OPEN));
    }

    static Stream<Arguments> allowedTransitions() {
        return Stream.of(
                Arguments.of(TicketStatus.OPEN, TicketStatus.IN_PROGRESS),
                Arguments.of(TicketStatus.OPEN, TicketStatus.CANCELLED),
                Arguments.of(TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED),
                Arguments.of(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED),
                Arguments.of(TicketStatus.RESOLVED, TicketStatus.CLOSED));
    }

    static Stream<Arguments> rejectedTransitions() {
        return Stream.of(
                Arguments.of(TicketStatus.CLOSED, TicketStatus.OPEN),
                Arguments.of(TicketStatus.RESOLVED, TicketStatus.OPEN),
                Arguments.of(TicketStatus.CANCELLED, TicketStatus.OPEN),
                Arguments.of(TicketStatus.OPEN, TicketStatus.RESOLVED),
                Arguments.of(TicketStatus.OPEN, TicketStatus.CLOSED),
                Arguments.of(TicketStatus.IN_PROGRESS, TicketStatus.OPEN),
                Arguments.of(TicketStatus.IN_PROGRESS, TicketStatus.CLOSED),
                Arguments.of(TicketStatus.RESOLVED, TicketStatus.IN_PROGRESS),
                Arguments.of(TicketStatus.RESOLVED, TicketStatus.CANCELLED),
                Arguments.of(TicketStatus.CLOSED, TicketStatus.IN_PROGRESS),
                Arguments.of(TicketStatus.CANCELLED, TicketStatus.CLOSED));
    }
}
