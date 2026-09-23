"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, getTicket, updateTicket } from "@/lib/api";
import {
  ErrorBanner,
  FieldErrors,
  LoadingState,
  StatusBadge,
  formatPriorityLabel,
} from "@/components/common";
import {
  TICKET_PRIORITIES,
  type TicketDetail,
  type TicketPriority,
  type UpdateTicketRequest,
} from "@/types/ticket";
import styles from "./TicketDetailPage.module.css";

type FormState = {
  title: string;
  description: string;
  priority: TicketPriority;
  assignee: string;
};

type TicketDetailPageProps = {
  ticketId: string;
};

function toForm(ticket: TicketDetail): FormState {
  return {
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    assignee: ticket.assignee ?? "",
  };
}

function clientValidate(form: FormState): Record<string, string> {
  const fields: Record<string, string> = {};
  if (!form.title.trim()) {
    fields.title = "must not be blank";
  }
  if (!form.description.trim()) {
    fields.description = "must not be blank";
  }
  return fields;
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function TicketDetailPage({ ticketId }: TicketDetailPageProps) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [saveError, setSaveError] = useState<unknown>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const data = await getTicket(ticketId);
      setTicket(data);
      setForm(toForm(data));
    } catch (err) {
      setTicket(null);
      setForm(null);
      setLoadError(err);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) {
      return;
    }

    setSaveError(null);
    setSaveMessage(null);

    const localErrors = clientValidate(form);
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }

    setFieldErrors({});
    setSaving(true);

    const payload: UpdateTicketRequest = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignee: form.assignee.trim() ? form.assignee.trim() : null,
    };

    try {
      const updated = await updateTicket(ticketId, payload);
      setTicket((prev) =>
        prev
          ? {
              ...prev,
              ...updated,
              comments: prev.comments,
            }
          : {
              ...updated,
              comments: [],
            },
      );
      setForm(toForm({ ...updated, comments: ticket?.comments ?? [] }));
      setSaveMessage("Changes saved.");
    } catch (err) {
      setSaveError(err);
      if (err instanceof ApiError && err.fields) {
        setFieldErrors(err.fields);
      }
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (!ticket) {
      return;
    }
    setForm(toForm(ticket));
    setFieldErrors({});
    setSaveError(null);
    setSaveMessage(null);
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Ticket detail</h1>
          <p className={styles.lead}>
            View and edit ticket fields. Status changes and comments come next.
          </p>
        </div>
        <Link href="/tickets" className={styles.back}>
          Back to list
        </Link>
      </header>

      {loading ? <LoadingState label="Loading ticket…" /> : null}

      {loadError ? (
        <ErrorBanner error={loadError} backHref="/tickets" onRetry={() => void load()} />
      ) : null}

      {!loading && ticket && form ? (
        <>
          <div className={styles.summary}>
            <div className={styles.meta}>
              <StatusBadge status={ticket.status} />
            </div>
            <dl className={styles.timestamps}>
              <div>
                <dt>Created</dt>
                <dd>{formatTimestamp(ticket.createdAt)}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatTimestamp(ticket.updatedAt)}</dd>
              </div>
              <div>
                <dt>Id</dt>
                <dd>
                  <code>{ticket.id}</code>
                </dd>
              </div>
            </dl>
          </div>

          {saveError ? <ErrorBanner error={saveError} showFields={false} /> : null}
          {saveMessage ? <p className={styles.success}>{saveMessage}</p> : null}

          <form className={styles.form} onSubmit={handleSave} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Title</span>
              <input
                className={styles.input}
                name="title"
                value={form.title}
                disabled={saving}
                maxLength={200}
                onChange={(event) =>
                  setForm((prev) =>
                    prev ? { ...prev, title: event.target.value } : prev,
                  )
                }
              />
              <FieldErrors name="title" fields={fieldErrors} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Description</span>
              <textarea
                className={styles.textarea}
                name="description"
                rows={6}
                value={form.description}
                disabled={saving}
                maxLength={10_000}
                onChange={(event) =>
                  setForm((prev) =>
                    prev ? { ...prev, description: event.target.value } : prev,
                  )
                }
              />
              <FieldErrors name="description" fields={fieldErrors} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Priority</span>
              <select
                className={styles.select}
                name="priority"
                value={form.priority}
                disabled={saving}
                onChange={(event) =>
                  setForm((prev) =>
                    prev
                      ? {
                          ...prev,
                          priority: event.target.value as TicketPriority,
                        }
                      : prev,
                  )
                }
              >
                {TICKET_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {formatPriorityLabel(priority)}
                  </option>
                ))}
              </select>
              <FieldErrors name="priority" fields={fieldErrors} />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Assignee</span>
              <input
                className={styles.input}
                name="assignee"
                value={form.assignee}
                disabled={saving}
                maxLength={100}
                onChange={(event) =>
                  setForm((prev) =>
                    prev ? { ...prev, assignee: event.target.value } : prev,
                  )
                }
              />
              <FieldErrors name="assignee" fields={fieldErrors} />
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.primary} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button
                type="button"
                className={styles.secondary}
                disabled={saving}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </>
      ) : null}
    </section>
  );
}
