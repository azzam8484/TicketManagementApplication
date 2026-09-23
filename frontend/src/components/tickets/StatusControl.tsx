"use client";

import { useState } from "react";
import type { TicketStatus } from "@/types/ticket";
import {
  ErrorBanner,
  StatusBadge,
  formatStatusLabel,
} from "@/components/common";
import {
  allowedNextStatuses,
  isTerminalStatus,
} from "@/lib/ticketStatusTransitions";
import styles from "./StatusControl.module.css";

type StatusControlProps = {
  currentStatus: TicketStatus;
  disabled?: boolean;
  onChangeStatus: (next: TicketStatus) => Promise<void>;
};

export function StatusControl({
  currentStatus,
  disabled = false,
  onChangeStatus,
}: StatusControlProps) {
  const nextOptions = allowedNextStatuses(currentStatus);
  const [selected, setSelected] = useState<TicketStatus | "">(
    nextOptions[0] ?? "",
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  // Keep selection valid when current status changes after a successful update
  const effectiveSelected =
    selected && nextOptions.includes(selected)
      ? selected
      : (nextOptions[0] ?? "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!effectiveSelected) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onChangeStatus(effectiveSelected);
      setSelected("");
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="status-control-heading">
      <div className={styles.header}>
        <h2 id="status-control-heading">Status</h2>
        <StatusBadge status={currentStatus} />
      </div>

      {isTerminalStatus(currentStatus) ? (
        <p className={styles.note}>
          This ticket is in a terminal status. No further status changes are
          allowed.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Change to</span>
            <select
              className={styles.select}
              value={effectiveSelected}
              disabled={disabled || busy}
              onChange={(event) =>
                setSelected(event.target.value as TicketStatus)
              }
            >
              {nextOptions.map((status) => (
                <option key={status} value={status}>
                  {formatStatusLabel(status)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className={styles.button}
            disabled={disabled || busy || !effectiveSelected}
          >
            {busy ? "Updating…" : "Update status"}
          </button>
        </form>
      )}

      {error ? <ErrorBanner error={error} /> : null}
    </section>
  );
}
