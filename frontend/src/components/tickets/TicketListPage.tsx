"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listTickets } from "@/lib/api";
import type { Ticket, TicketStatus } from "@/types/ticket";
import { EmptyState, ErrorBanner, LoadingState } from "@/components/common";
import {
  TicketListControls,
  type TicketListFilters,
} from "@/components/tickets/TicketListControls";
import { TicketListTable } from "@/components/tickets/TicketListTable";
import styles from "./TicketListPage.module.css";

const EMPTY_FILTERS: TicketListFilters = {
  keyword: "",
  status: "",
};

export function TicketListPage() {
  const [filters, setFilters] = useState<TicketListFilters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<TicketListFilters>(EMPTY_FILTERS);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async (next: TicketListFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await listTickets({
        keyword: next.keyword.trim() || undefined,
        status: (next.status || undefined) as TicketStatus | undefined,
      });
      setTickets(response.items);
      setApplied(next);
    } catch (err) {
      setError(err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(EMPTY_FILTERS);
  }, [load]);

  const hasActiveFilters =
    Boolean(applied.keyword.trim()) || Boolean(applied.status);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Tickets</h1>
          <p className={styles.lead}>
            Search and filter tickets, or create a new one.
          </p>
        </div>
        <Link href="/tickets/new" className={styles.create}>
          Create ticket
        </Link>
      </header>

      <div className={styles.controls}>
        <TicketListControls
          filters={filters}
          onFiltersChange={setFilters}
          disabled={loading}
          onSubmit={() => {
            void load(filters);
          }}
          onStatusFilterChange={(next) => {
            void load(next);
          }}
          onClear={() => {
            setFilters(EMPTY_FILTERS);
            void load(EMPTY_FILTERS);
          }}
        />
      </div>

      {error ? (
        <ErrorBanner
          error={error}
          showFields
          onRetry={() => {
            void load(applied);
          }}
        />
      ) : null}

      {loading ? <LoadingState label="Loading tickets…" /> : null}

      {!loading && !error && tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          description={
            hasActiveFilters
              ? "Try clearing search/filter, or create a new ticket."
              : "Create your first ticket to get started."
          }
          actionHref="/tickets/new"
          actionLabel="Create ticket"
        />
      ) : null}

      {!loading && !error && tickets.length > 0 ? (
        <TicketListTable tickets={tickets} />
      ) : null}
    </section>
  );
}
