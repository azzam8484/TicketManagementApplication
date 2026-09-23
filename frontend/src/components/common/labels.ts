import type { TicketPriority, TicketStatus } from "@/types/ticket";

const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

const PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function formatStatusLabel(status: TicketStatus): string {
  return STATUS_LABELS[status];
}

export function formatPriorityLabel(priority: TicketPriority): string {
  return PRIORITY_LABELS[priority];
}
