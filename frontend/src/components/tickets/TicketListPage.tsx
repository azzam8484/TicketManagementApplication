"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { listTickets } from "@/lib/api";
import type { Ticket, TicketStatus } from "@/types/ticket";
import { TICKET_STATUSES } from "@/types/ticket";
import {
  EmptyState,
  ErrorBanner,
  LoadingState,
  formatStatusLabel,
} from "@/components/common";
import { TicketListTable } from "@/components/tickets/TicketListTable";
import {
  InProgressTicketsIcon,
  OpenTicketsIcon,
  ResolvedTicketsIcon,
  TotalTicketsIcon,
} from "@/components/tickets/StatIcons";
import styles from "./TicketListPage.module.css";

function isTicketStatus(value: string | null): value is TicketStatus {
  return Boolean(value && (TICKET_STATUSES as readonly string[]).includes(value));
}

export function TicketListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const appliedStatus = isTicketStatus(statusParam) ? statusParam : "";

  const [keyword, setKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async (nextKeyword: string, nextStatus: string) => {
    setLoading(true);
    setError(null);
    try {
      const [filtered, all] = await Promise.all([
        listTickets({
          keyword: nextKeyword.trim() || undefined,
          status: (nextStatus || undefined) as TicketStatus | undefined,
        }),
        listTickets(),
      ]);
      setTickets(filtered.items);
      setAllTickets(all.items);
      setAppliedKeyword(nextKeyword);
    } catch (err) {
      setError(err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(keyword, appliedStatus);
    // Sync when sidebar status changes; keyword applied only on Search.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: status from URL
  }, [appliedStatus, load]);

  const counts = useMemo(() => {
    const result = {
      total: allTickets.length,
      open: 0,
      inProgress: 0,
      resolved: 0,
    };
    for (const ticket of allTickets) {
      if (ticket.status === "OPEN") result.open += 1;
      if (ticket.status === "IN_PROGRESS") result.inProgress += 1;
      if (ticket.status === "RESOLVED") result.resolved += 1;
    }
    return result;
  }, [allTickets]);

  const hasActiveFilters = Boolean(appliedKeyword.trim()) || Boolean(appliedStatus);

  function applyStatus(next: string) {
    const params = new URLSearchParams();
    if (next) params.set("status", next);
    const qs = params.toString();
    router.push(qs ? `/tickets?${qs}` : "/tickets");
  }

  return (
    <div className={styles.workspace}>
      <header className={styles.topBar}>
        <div className={styles.topTitleGroup}>
          <h1 className={styles.topTitle}>Ticket Management</h1>
          <span className={styles.topCount}>
            {loading
              ? "…"
              : `${tickets.length} ticket${tickets.length === 1 ? "" : "s"}`}
            {appliedStatus
              ? ` · ${formatStatusLabel(appliedStatus)}`
              : ""}
          </span>
        </div>
        <Link href="/tickets/new" className={styles.create}>
          + Create Ticket
        </Link>
      </header>

      <section className={styles.page}>
      <div className={styles.stats}>
        <button
          type="button"
          className={`${styles.statCard} ${!appliedStatus ? styles.statActiveTotal : ""}`}
          onClick={() => applyStatus("")}
          aria-pressed={!appliedStatus}
        >
          <span className={`${styles.statIcon} ${styles.statIconTotal}`}>
            <TotalTicketsIcon />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{counts.total}</p>
            <p className={styles.statLabel}>Total Tickets</p>
            <p className={styles.statHint}>All statuses</p>
          </div>
        </button>
        <button
          type="button"
          className={`${styles.statCard} ${appliedStatus === "OPEN" ? styles.statActiveOpen : ""}`}
          onClick={() => applyStatus("OPEN")}
          aria-pressed={appliedStatus === "OPEN"}
        >
          <span className={`${styles.statIcon} ${styles.statIconOpen}`}>
            <OpenTicketsIcon />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{counts.open}</p>
            <p className={styles.statLabel}>Open</p>
            <p className={`${styles.statHint} ${styles.hintOpen}`}>Ready to start</p>
          </div>
        </button>
        <button
          type="button"
          className={`${styles.statCard} ${appliedStatus === "IN_PROGRESS" ? styles.statActiveProgress : ""}`}
          onClick={() => applyStatus("IN_PROGRESS")}
          aria-pressed={appliedStatus === "IN_PROGRESS"}
        >
          <span className={`${styles.statIcon} ${styles.statIconProgress}`}>
            <InProgressTicketsIcon />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{counts.inProgress}</p>
            <p className={styles.statLabel}>In Progress</p>
            <p className={`${styles.statHint} ${styles.hintProgress}`}>
              Currently active
            </p>
          </div>
        </button>
        <button
          type="button"
          className={`${styles.statCard} ${appliedStatus === "RESOLVED" ? styles.statActiveResolved : ""}`}
          onClick={() => applyStatus("RESOLVED")}
          aria-pressed={appliedStatus === "RESOLVED"}
        >
          <span className={`${styles.statIcon} ${styles.statIconResolved}`}>
            <ResolvedTicketsIcon />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{counts.resolved}</p>
            <p className={styles.statLabel}>Resolved</p>
            <p className={`${styles.statHint} ${styles.hintResolved}`}>
              Successfully resolved
            </p>
          </div>
        </button>
      </div>

      <div className={styles.controls}>
        <form
          className={styles.filterBar}
          onSubmit={(event) => {
            event.preventDefault();
            void load(keyword, appliedStatus);
          }}
        >
          <input
            className={styles.search}
            type="search"
            name="keyword"
            placeholder="Search by title or description…"
            value={keyword}
            disabled={loading}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <select
            className={styles.select}
            value={appliedStatus}
            disabled={loading}
            onChange={(event) => applyStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {TICKET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {formatStatusLabel(status)}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.searchBtn} disabled={loading}>
            Search
          </button>
          <button
            type="button"
            className={styles.clearBtn}
            disabled={loading}
            onClick={() => {
              setKeyword("");
              router.push("/tickets");
              void load("", "");
            }}
          >
            Clear
          </button>
        </form>
      </div>

      {error ? (
        <ErrorBanner
          error={error}
          showFields
          onRetry={() => {
            void load(appliedKeyword, appliedStatus);
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
    </div>
  );
}
