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
  PriorityBadge,
  StatusBadge,
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
  initialEditing?: boolean;
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

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function TicketDetailPage({
  ticketId,
  initialEditing = false,
}: TicketDetailPageProps) {
  const router = useRouter();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [editing, setEditing] = useState(initialEditing);
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

  useEffect(() => {
    setEditing(initialEditing);
  }, [initialEditing]);

  function cancelEdit() {
    if (!ticket) {
      return;
    }
    setForm(toForm(ticket));
    setFieldErrors({});
    setSaveError(null);
    setEditing(false);
    router.replace(`/tickets/${ticketId}`);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) {
      return;
    }

    setSaveError(null);
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

  if (editing) {
    return (
      <FormWorkspace
        title="Edit Ticket"
        actionLabel={saving ? "Saving…" : "Save changes"}
        actionFormId={FORM_ID}
        actionDisabled={saving}
        headerExtra={
          <button
            type="button"
            className={styles.topSecondary}
            disabled={saving}
            onClick={cancelEdit}
          >
            Cancel
          </button>
        }
      >
        {saveError &&
        !(
          saveError instanceof ApiError &&
          saveError.fields &&
          Object.keys(saveError.fields).length > 0
        ) ? (
          <ErrorBanner error={saveError} showFields={false} />
        ) : null}

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
          disabled={saving}
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
                onChange={(event) => {
                  setForm((prev) =>
                    prev ? { ...prev, title: event.target.value } : prev,
                  );
                  setFieldErrors((prev) => {
                    if (!prev.title) return prev;
                    const next = { ...prev };
                    delete next.title;
                    return next;
                  });
                }}
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
                onChange={(event) => {
                  setForm((prev) =>
                    prev ? { ...prev, description: event.target.value } : prev,
                  );
                  setFieldErrors((prev) => {
                    if (!prev.description) return prev;
                    const next = { ...prev };
                    delete next.description;
                    return next;
                  });
                }}
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
                disabled={saving}
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
          disabled={saving}
          onAddComment={handleAddComment}
        />
      </FormWorkspace>
    );
  }

  return (
    <FormWorkspace
      title="Ticket details"
      headerExtra={
        <Link href="/tickets" className={styles.topSecondary}>
          Back to list
        </Link>
      }
    >
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

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>{ticket.title}</h2>
            <p className={styles.lead}>Ticket overview</p>
          </div>
        </div>

        <dl className={styles.detailGrid}>
          <div className={styles.detailBlock}>
            <dt>Description</dt>
            <dd className={styles.detailDescription}>{ticket.description}</dd>
          </div>
          <div className={styles.detailRow}>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusBadge status={ticket.status} />
              </dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>
                <PriorityBadge priority={ticket.priority} />
              </dd>
            </div>
            <div>
              <dt>Assignee</dt>
              <dd>{ticket.assignee?.trim() ? ticket.assignee : "—"}</dd>
            </div>
          </div>
        </dl>
      </div>

      <CommentsSection comments={ticket.comments} readOnly />
    </FormWorkspace>
  );
}
