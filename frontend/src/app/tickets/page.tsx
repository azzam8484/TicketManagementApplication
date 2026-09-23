import { API_BASE_URL } from "@/lib/config";
import styles from "./page.module.css";

export default function TicketsPage() {
  return (
    <section className={styles.panel}>
      <h1>Tickets</h1>
      <p className={styles.lead}>
        Frontend skeleton is ready. Ticket list UI will be built in the next
        parts.
      </p>
      <dl className={styles.meta}>
        <div>
          <dt>API base URL</dt>
          <dd>
            <code>{API_BASE_URL}</code>
          </dd>
        </div>
        <div>
          <dt>Next routes</dt>
          <dd>
            <code>/tickets</code>, <code>/tickets/new</code>,{" "}
            <code>/tickets/[id]</code>
          </dd>
        </div>
      </dl>
    </section>
  );
}
