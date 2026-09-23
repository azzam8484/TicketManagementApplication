"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ApiError,
  addComment,
  changeTicketStatus,
  getTicket,
  updateTicket,
} from "@/lib/api";
import {
  ErrorBanner,
  FieldErrors,
  FormWorkspace,
  LoadingState,
  formatPriorityLabel,
} from "@/components/common";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { StatusControl } from "@/components/tickets/StatusControl";
import {
  TICKET_PRIORITIES,
  type TicketDetail,
  type TicketPriority,
  type TicketStatus,
  type UpdateTicketRequest,
} from "@/types/ticket";
import styles from "./TicketForm.module.css";

type FormState = {
  title: string;
  description: string;
  priority: TicketPriority;
  assignee: string;
};

type TicketDetailPageProps = {
  ticketId: string;
};

const FORM_ID = "edit-ticket-form";

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
  const router = useRouter();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [saveError, setSaveError] = useState<unknown>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setSaveError(null);
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

  const canSave =
    Boolean(form?.title.trim()) && Boolean(form?.description.trim());

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) {
      return;
    }

    setSaveError(null);

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
      await updateTicket(ticketId, payload);
      router.push("/tickets");
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
  }

  async function handleStatusChange(next: TicketStatus) {
    const updated = await changeTicketStatus(ticketId, next);
    setTicket((prev) =>
      prev
        ? { ...prev, ...updated, comments: prev.comments }
        : { ...updated, comments: [] },
    );
  }

  async function handleAddComment(text: string) {
    const created = await addComment(ticketId, { text });
    setTicket((prev) =>
      prev
        ? {
            ...prev,
            comments: [...prev.comments, created],
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  }

  if (loading) {
    return (
      <div className={styles.card} style={{ margin: "1.35rem 1.5rem" }}>
        <LoadingState label="Loading ticket…" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ margin: "1.35rem 1.5rem" }}>
        <ErrorBanner
          error={loadError}
          backHref="/tickets"
          onRetry={() => void load()}
        />
      </div>
    );
  }

  if (!ticket || !form) {
    return null;
  }

  return (
    <FormWorkspace
      title="Edit Ticket"
      actionLabel={saving ? "Saving…" : "Save changes"}
      actionFormId={FORM_ID}
      actionDisabled={saving || !canSave}
    >
      {saveError ? <ErrorBanner error={saveError} showFields={false} /> : null}

      <div className={styles.metaCard}>
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

      <StatusControl
        currentStatus={ticket.status}
        onChangeStatus={handleStatusChange}
      />

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Edit ticket</h2>
            <p className={styles.lead}>
              Update ticket fields, then save to return to the list.
            </p>
          </div>
          <Link href="/tickets" className={styles.back}>
            Back to list
          </Link>
        </div>

        <form
          id={FORM_ID}
          className={styles.form}
          onSubmit={handleSave}
          noValidate
        >
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
              rows={5}
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
            <span className={styles.label}>Assignee (optional)</span>
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
            <button
              type="submit"
              className={styles.primary}
              disabled={saving || !canSave}
            >
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
      </div>

      <CommentsSection
        comments={ticket.comments}
        onAddComment={handleAddComment}
      />
    </FormWorkspace>
  );
}
