/**
 * Types aligned with backend DTOs / api-contract.md (F2).
 */

export const TICKET_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "CANCELLED",
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  ticketId: string;
  text: string;
  createdAt: string;
};

export type TicketDetail = Ticket & {
  comments: Comment[];
};

export type TicketListResponse = {
  items: Ticket[];
};

export type CreateTicketRequest = {
  title: string;
  description: string;
  priority: TicketPriority;
  assignee?: string | null;
};

/** Field update only — never include status (use changeTicketStatus). */
export type UpdateTicketRequest = {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assignee?: string | null;
};

export type ChangeStatusRequest = {
  status: TicketStatus;
};

export type CreateCommentRequest = {
  text: string;
};

export type ListTicketsParams = {
  keyword?: string;
  status?: TicketStatus;
};

export type ApiErrorBody = {
  code: string;
  message: string;
  fields?: Record<string, string>;
};
