import {
  ErrorBanner,
  FieldErrors,
  LoadingState,
  PriorityBadge,
  StatusBadge,
} from "@/components/common";
import { ApiError } from "@/lib/api";
import { API_BASE_URL } from "@/lib/config";
import styles from "./page.module.css";

/**
 * F3 demo: shared loading / error / badge building blocks.
 * Real list wiring comes in F4.
 */
export default function TicketsPage() {
  const sampleValidation = new ApiError(400, "VALIDATION_ERROR", "Request validation failed", {
    title: "must not be blank",
  });

  return (
    <section className={styles.panel}>
      <h1>Tickets</h1>
      <p className={styles.lead}>
        Shared UI pieces are ready (F3). Ticket list with search/filter lands in
        F4.
      </p>

      <div className={styles.preview}>
        <h2>Building blocks</h2>
        <LoadingState label="Loading tickets…" />
        <div className={styles.badges}>
          <StatusBadge status="OPEN" />
          <StatusBadge status="IN_PROGRESS" />
          <PriorityBadge priority="HIGH" />
          <PriorityBadge priority="MEDIUM" />
        </div>
        <ErrorBanner error={sampleValidation} showFields />
        <FieldErrors name="title" fields={sampleValidation.fields} />
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>API base URL</dt>
          <dd>
            <code>{API_BASE_URL}</code>
          </dd>
        </div>
      </dl>
    </section>
  );
}
