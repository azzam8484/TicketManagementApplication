"use client";

import { useMemo, useState } from "react";
import type { Comment } from "@/types/ticket";
import { ApiError } from "@/lib/api";
import { ErrorBanner, FieldErrors } from "@/components/common";
import styles from "./CommentsSection.module.css";

type CommentsSectionProps = {
  comments: Comment[];
  disabled?: boolean;
  onAddComment: (text: string) => Promise<void>;
};

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function CommentsSection({
  comments,
  disabled = false,
  onAddComment,
}: CommentsSectionProps) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const ordered = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [comments],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!text.trim()) {
      setFieldErrors({ text: "must not be blank" });
      return;
    }

    setFieldErrors({});
    setBusy(true);
    try {
      await onAddComment(text.trim());
      setText("");
    } catch (err) {
      setError(err);
      if (err instanceof ApiError && err.fields) {
        setFieldErrors(err.fields);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="comments-heading">
      <h2 id="comments-heading">Comments</h2>

      {ordered.length === 0 ? (
        <p className={styles.empty}>No comments yet.</p>
      ) : (
        <ul className={styles.list}>
          {ordered.map((comment) => (
            <li key={comment.id} className={styles.item}>
              <p className={styles.text}>{comment.text}</p>
              <time className={styles.time} dateTime={comment.createdAt}>
                {formatTimestamp(comment.createdAt)}
              </time>
            </li>
          ))}
        </ul>
      )}

      {error ? <ErrorBanner error={error} showFields={false} /> : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span className={styles.label}>Add comment</span>
          <textarea
            className={styles.textarea}
            name="text"
            rows={3}
            value={text}
            disabled={disabled || busy}
            maxLength={10_000}
            onChange={(event) => setText(event.target.value)}
          />
          <FieldErrors name="text" fields={fieldErrors} />
        </label>
        <button
          type="submit"
          className={styles.button}
          disabled={disabled || busy}
        >
          {busy ? "Adding…" : "Add comment"}
        </button>
      </form>
    </section>
  );
}
