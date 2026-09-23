import type { TicketStatus } from "@/types/ticket";

/**
 * Mirrors backend TicketStatusTransitionPolicy / state-machine.md (F7).
 * UX-only — backend still enforces transitions.
 */
const ALLOWED_NEXT: Record<TicketStatus, readonly TicketStatus[]> = {
  OPEN: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["RESOLVED", "CANCELLED"],
  RESOLVED: ["CLOSED"],
  CLOSED: [],
  CANCELLED: [],
};

export function allowedNextStatuses(current: TicketStatus): TicketStatus[] {
  return [...ALLOWED_NEXT[current]];
}

export function isTerminalStatus(status: TicketStatus): boolean {
  return ALLOWED_NEXT[status].length === 0;
}
