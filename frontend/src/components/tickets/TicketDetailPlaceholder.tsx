"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTicket } from "@/lib/api";
import type { TicketDetail } from "@/types/ticket";
import {
  ErrorBanner,
  LoadingState,
  PriorityBadge,
  StatusBadge,
} from "@/components/common";
import styles from "./TicketDetailPlaceholder.module.css";

type TicketDetailPlaceholderProps = {
  ticketId: string;
};

/**
 * Thin detail shell so F5 create → redirect works.
 * Full edit / status / comments come in F6–F7.
 */
export function TicketDetailPlaceholder({
  ticketId,
}: TicketDetailPlaceholderProps) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTicket(ticketId);
        if (!cancelled) {
          setTicket(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setTicket(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [ticketId]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Ticket detail</h1>
          <p className={styles.lead}>
            Basic view only — edit, status changes, and comments arrive in later
            parts.
          </p>
        </div>
        <Link href="/tickets" className={styles.back}>
          Back to list
        </Link>
      </header>

      {loading ? <LoadingState label="Loading ticket…" /> : null}

      {error ? (
        <ErrorBanner error={error} backHref="/tickets" />
      ) : null}

      {!loading && ticket ? (
        <article className={styles.card}>
          <h2 className={styles.title}>{ticket.title}</h2>
          <div className={styles.meta}>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <p className={styles.description}>{ticket.description}</p>
          <dl className={styles.details}>
            <div>
              <dt>Assignee</dt>
              <dd>{ticket.assignee?.trim() ? ticket.assignee : "—"}</dd>
            </div>
            <div>
              <dt>Id</dt>
              <dd>
                <code>{ticket.id}</code>
              </dd>
            </div>
          </dl>
        </article>
      ) : null}
    </section>
  );
}
