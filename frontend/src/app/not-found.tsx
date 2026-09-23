import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ display: "grid", gap: "0.75rem", maxWidth: "32rem" }}>
      <h1>Page not found</h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.45 }}>
        That route does not exist in the Ticket Management UI.
      </p>
      <Link
        href="/tickets"
        style={{
          color: "var(--accent)",
          textDecoration: "underline",
          textUnderlineOffset: "0.15em",
        }}
      >
        Back to tickets
      </Link>
    </section>
  );
}
