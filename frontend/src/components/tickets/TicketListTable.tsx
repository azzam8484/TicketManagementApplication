"use client";

import { useRouter } from "next/navigation";
import type { Ticket } from "@/types/ticket";
import { PriorityBadge, StatusBadge } from "@/components/common";
import styles from "./TicketListTable.module.css";

type TicketListTableProps = {
  tickets: Ticket[];
};

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
                {ticket.assignee?.trim() ? ticket.assignee : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
