"use client";

import { TICKET_STATUSES, type TicketStatus } from "@/types/ticket";
import { formatStatusLabel } from "@/components/common";
import styles from "./TicketListControls.module.css";

export type TicketListFilters = {
  keyword: string;
  status: TicketStatus | "";
};

type TicketListControlsProps = {
  filters: TicketListFilters;
  onFiltersChange: (next: TicketListFilters) => void;
  onSubmit: () => void;
  onClear: () => void;
  /** Called when status filter changes (ui-flow: reload on filter). */
  onStatusFilterChange?: (next: TicketListFilters) => void;
  disabled?: boolean;
};

export function TicketListControls({
  filters,
  onFiltersChange,
  onSubmit,
  onClear,
  onStatusFilterChange,
  disabled = false,
}: TicketListControlsProps) {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className={styles.field}>
        <span className={styles.label}>Search</span>
        <input
          type="search"
          name="keyword"
          placeholder="Title or description"
          value={filters.keyword}
          disabled={disabled}
          onChange={(event) =>
            onFiltersChange({ ...filters, keyword: event.target.value })
          }
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Status</span>
        <select
          name="status"
          value={filters.status}
          disabled={disabled}
          onChange={(event) => {
            const value = event.target.value as TicketStatus | "";
            const next = { ...filters, status: value };
            onFiltersChange(next);
            onStatusFilterChange?.(next);
          }}
          className={styles.select}
        >
          <option value="">All</option>
          {TICKET_STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatStatusLabel(status)}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primary} disabled={disabled}>
          Search
        </button>
        <button
          type="button"
          className={styles.secondary}
          disabled={disabled}
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
