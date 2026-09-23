"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { listTickets } from "@/lib/api";
import type { Ticket, TicketStatus } from "@/types/ticket";
import { formatStatusLabel } from "@/components/common";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
};

type StatusCounts = Record<TicketStatus | "ALL", number>;

const EMPTY_COUNTS: StatusCounts = {
  ALL: 0,
  OPEN: 0,
  IN_PROGRESS: 0,
  RESOLVED: 0,
  CLOSED: 0,
  CANCELLED: 0,
};

function countByStatus(tickets: Ticket[]): StatusCounts {
  const counts = { ...EMPTY_COUNTS };
  counts.ALL = tickets.length;
  for (const ticket of tickets) {
    counts[ticket.status] += 1;
  }
  return counts;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [counts, setCounts] = useState<StatusCounts>(EMPTY_COUNTS);

  const refreshCounts = useCallback(async () => {
    try {
      const response = await listTickets();
      setCounts(countByStatus(response.items));
    } catch {
      // Keep last known counts if list page shows the error.
    }
  }, []);

  useEffect(() => {
    void refreshCounts();
  }, [refreshCounts, pathname]);

  const activeStatus = searchParams.get("status");
  const onTickets = pathname === "/tickets" || pathname === "/";
  const onCreate = pathname === "/tickets/new";

  const workspaceLinks = useMemo(
    () =>
      [
        { href: "/tickets", label: "All Tickets", key: "ALL" as const },
        {
          href: "/tickets?status=OPEN",
          label: formatStatusLabel("OPEN"),
          key: "OPEN" as const,
        },
        {
          href: "/tickets?status=IN_PROGRESS",
          label: formatStatusLabel("IN_PROGRESS"),
          key: "IN_PROGRESS" as const,
        },
        {
          href: "/tickets?status=RESOLVED",
          label: formatStatusLabel("RESOLVED"),
          key: "RESOLVED" as const,
        },
        {
          href: "/tickets?status=CLOSED",
          label: formatStatusLabel("CLOSED"),
          key: "CLOSED" as const,
        },
        {
          href: "/tickets?status=CANCELLED",
          label: formatStatusLabel("CANCELLED"),
          key: "CANCELLED" as const,
        },
      ] as const,
    [],
  );

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/tickets" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            T
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Tickr</span>
            <span className={styles.brandSub}>Management</span>
          </span>
        </Link>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Workspace</p>
          <nav className={styles.nav}>
            {workspaceLinks.map((item) => {
              const isActive =
                onTickets &&
                ((item.key === "ALL" && !activeStatus) ||
                  activeStatus === item.key);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navActive : ""}`}
                >
                  <span>{item.label}</span>
                  <span className={styles.count}>{counts[item.key]}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Actions</p>
          <Link
            href="/tickets/new"
            className={`${styles.newTicket} ${onCreate ? styles.newTicketActive : ""}`}
          >
            + New Ticket
          </Link>
        </div>
      </aside>

      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
