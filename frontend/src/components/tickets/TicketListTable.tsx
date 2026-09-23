"use client";

import { useRouter } from "next/navigation";
import type { Ticket } from "@/types/ticket";
import { PriorityBadge, StatusBadge } from "@/components/common";
import styles from "./TicketListTable.module.css";

type TicketListTableProps = {
  tickets: Ticket[];
};

function formatRelative(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const diffMs = Date.now() - date.getTime();
  const mins = Math.round(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function TicketListTable({ tickets }: TicketListTableProps) {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Assignee</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className={styles.row}
              tabIndex={0}
              role="link"
              aria-label={`Open ticket ${ticket.title}`}
              onClick={() => router.push(`/tickets/${ticket.id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(`/tickets/${ticket.id}`);
                }
              }}
            >
              <td className={styles.titleCell}>{ticket.title}</td>
              <td>
                <StatusBadge status={ticket.status} />
              </td>
              <td>
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className={styles.assignee}>
                {ticket.assignee?.trim() ? (
                  <span className={styles.person}>
                    <span className={styles.avatar} aria-hidden="true">
                      {initials(ticket.assignee)}
                    </span>
                    {ticket.assignee}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className={styles.updated}>
                {formatRelative(ticket.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
