"use client";

import Link from "next/link";
import type { Ticket } from "@/types/ticket";
import { PriorityBadge, StatusBadge } from "@/components/common";
import styles from "./TicketListTable.module.css";

type TicketListTableProps = {
  tickets: Ticket[];
};

export function TicketListTable({ tickets }: TicketListTableProps) {
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
            <tr key={ticket.id}>
              <td>
                <Link href={`/tickets/${ticket.id}`} className={styles.titleLink}>
                  {ticket.title}
                </Link>
              </td>
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
