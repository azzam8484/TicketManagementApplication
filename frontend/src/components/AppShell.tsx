import Link from "next/link";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/tickets" className={styles.brand}>
          Ticket Management
        </Link>
        <nav className={styles.nav}>
          <Link href="/tickets">Tickets</Link>
          <Link href="/tickets/new">New ticket</Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
