import { API_BASE_URL } from "@/lib/config";
import styles from "./page.module.css";

/**
 * F2 ships the API client under src/lib/api.
 * List UI (search/filter/table) lands in F4.
 */
export default function TicketsPage() {
  return (
    <section className={styles.panel}>
      <h1>Tickets</h1>
      <p className={styles.lead}>
        API client and TypeScript types are ready (F2). Ticket list UI comes in
        F4; shared loading/error pieces in F3.
      </p>
      <dl className={styles.meta}>
        <div>
          <dt>API base URL</dt>
          <dd>
            <code>{API_BASE_URL}</code>
          </dd>
        </div>
        <div>
          <dt>Client helpers</dt>
          <dd>
            <code>listTickets</code>, <code>getTicket</code>,{" "}
            <code>createTicket</code>, <code>updateTicket</code>,{" "}
            <code>changeTicketStatus</code>, <code>addComment</code>
          </dd>
        </div>
      </dl>
    </section>
  );
}
