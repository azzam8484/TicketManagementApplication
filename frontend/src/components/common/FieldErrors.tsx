import styles from "./FieldErrors.module.css";

type FieldErrorsProps = {
  /** Full fields map from ApiError, or a single field's message */
  fields?: Record<string, string>;
  /** When set, only show this field's message */
  name?: string;
  /** Convenience for a single message without a map */
  message?: string;
};

/**
 * Per-field validation messages for forms (F3 / ui-flow 400 rules).
 */
export function FieldErrors({ fields, name, message }: FieldErrorsProps) {
  if (message) {
    return (
      <p className={styles.error} role="alert">
        {message}
      </p>
    );
  }

  if (!fields) {
    return null;
  }

  if (name) {
    const detail = fields[name];
    if (!detail) {
      return null;
    }
    return (
      <p className={styles.error} role="alert">
        {detail}
      </p>
    );
  }

  const entries = Object.entries(fields);
  if (entries.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list} role="alert">
      {entries.map(([field, detail]) => (
        <li key={field}>
          <strong>{field}</strong>: {detail}
        </li>
      ))}
    </ul>
  );
}
