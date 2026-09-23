"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ApiError, createTicket } from "@/lib/api";
import {
  ErrorBanner,
  FieldErrors,
  FormWorkspace,
  formatPriorityLabel,
} from "@/components/common";
import {
  TICKET_PRIORITIES,
  type CreateTicketRequest,
  type TicketPriority,
} from "@/types/ticket";
import styles from "./TicketForm.module.css";

type FormState = {
  title: string;
  description: string;
  priority: TicketPriority;
  assignee: string;
};

const INITIAL: FormState = {
  title: "",
  description: "",
  priority: "MEDIUM",
  assignee: "",
};

const FORM_ID = "create-ticket-form";

export function CreateTicketPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<unknown>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const payload: CreateTicketRequest = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignee: form.assignee.trim() ? form.assignee.trim() : null,
    };

    try {
      await createTicket(payload);
      router.push("/tickets");
    } catch (err) {
      setError(err);
      if (err instanceof ApiError && err.fields) {
        setFieldErrors(err.fields);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormWorkspace
      title="New Ticket"
      actionLabel={submitting ? "Creating…" : "+ Create Ticket"}
      actionFormId={FORM_ID}
      actionDisabled={submitting}
    >
      {error &&
      !(
        error instanceof ApiError &&
        error.fields &&
        Object.keys(error.fields).length > 0
      ) ? (
        <ErrorBanner error={error} showFields={false} />
      ) : null}

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>Create ticket</h2>
            <p className={styles.lead}>
              New tickets start in Open status after they are saved.
            </p>
          </div>
          <Link href="/tickets" className={styles.back}>
            Back to list
          </Link>
        </div>

        <form
          id={FORM_ID}
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              className={styles.input}
              name="title"
              value={form.title}
              disabled={submitting}
              maxLength={200}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, title: event.target.value }));
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
              disabled={submitting}
              maxLength={10_000}
              onChange={(event) => {
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }));
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
              disabled={submitting}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  priority: event.target.value as TicketPriority,
                }))
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
              disabled={submitting}
              maxLength={100}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, assignee: event.target.value }))
              }
            />
            <FieldErrors name="assignee" fields={fieldErrors} />
          </label>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primary}
              disabled={submitting}
            >
              {submitting ? "Creating…" : "Create"}
            </button>
            <Link
              href="/tickets"
              className={styles.secondary}
              aria-disabled={submitting}
              onClick={(event) => {
                if (submitting) {
                  event.preventDefault();
                }
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </FormWorkspace>
  );
}
