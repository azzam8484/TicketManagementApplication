import { apiRequest } from "@/lib/api/client";
import type {
  ChangeStatusRequest,
  Comment,
  CreateCommentRequest,
  CreateTicketRequest,
  ListTicketsParams,
  Ticket,
  TicketDetail,
  TicketListResponse,
  TicketStatus,
  UpdateTicketRequest,
} from "@/types/ticket";

function ticketsPath(query?: ListTicketsParams): string {
  const params = new URLSearchParams();
  const keyword = query?.keyword?.trim();
  if (keyword) {
    params.set("keyword", keyword);
  }
  if (query?.status) {
    params.set("status", query.status);
  }
  const qs = params.toString();
  return qs ? `/api/v1/tickets?${qs}` : "/api/v1/tickets";
}

/** GET /api/v1/tickets */
export function listTickets(
  params?: ListTicketsParams,
): Promise<TicketListResponse> {
  return apiRequest<TicketListResponse>(ticketsPath(params), {
    method: "GET",
    cache: "no-store",
  });
}

/** GET /api/v1/tickets/{id} */
export function getTicket(id: string): Promise<TicketDetail> {
  return apiRequest<TicketDetail>(`/api/v1/tickets/${id}`, {
    method: "GET",
    cache: "no-store",
  });
}

/** POST /api/v1/tickets */
export function createTicket(payload: CreateTicketRequest): Promise<Ticket> {
  return apiRequest<Ticket>("/api/v1/tickets", {
    method: "POST",
    body: payload,
  });
}

/** PATCH /api/v1/tickets/{id} — fields only, not status */
export function updateTicket(
  id: string,
  payload: UpdateTicketRequest,
): Promise<Ticket> {
  return apiRequest<Ticket>(`/api/v1/tickets/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

/** PATCH /api/v1/tickets/{id}/status */
export function changeTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<Ticket> {
  const body: ChangeStatusRequest = { status };
  return apiRequest<Ticket>(`/api/v1/tickets/${id}/status`, {
    method: "PATCH",
    body,
  });
}

/** POST /api/v1/tickets/{id}/comments */
export function addComment(
  id: string,
  payload: CreateCommentRequest,
): Promise<Comment> {
  return apiRequest<Comment>(`/api/v1/tickets/${id}/comments`, {
    method: "POST",
    body: payload,
  });
}
