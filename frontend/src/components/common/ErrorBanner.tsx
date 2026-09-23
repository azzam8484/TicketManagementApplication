import Link from "next/link";
import { ApiError } from "@/lib/api";
import {
  resolveErrorFields,
  resolveErrorMessage,
} from "@/components/common/errorMessage";
import styles from "./ErrorBanner.module.css";

type ErrorBannerProps = {
  error: unknown;
  onRetry?: () => void;
  /** e.g. `/tickets` for 404 pages */
  backHref?: string;
  backLabel?: string;
  /** When true, also list API field errors under the summary */
  showFields?: boolean;
};

/** Page / section error banner (F3). */
export function ErrorBanner({
  error,
  onRetry,
  backHref,
  backLabel = "Back to tickets",
  showFields = false,
}: ErrorBannerProps) {
  const message = resolveErrorMessage(error);
  const fields = showFields ? resolveErrorFields(error) : undefined;
  const isNotFound = error instanceof ApiError && error.isNotFound;
  const tone =
    error instanceof ApiError && error.isConflict
      ? styles.conflict
      : isNotFound
        ? styles.notFound
        : styles.danger;

  return (
    <div className={`${styles.banner} ${tone}`} role="alert">
      <p className={styles.message}>{message}</p>
      {fields && Object.keys(fields).length > 0 ? (
        <ul className={styles.fieldList}>
          {Object.entries(fields).map(([name, detail]) => (
            <li key={name}>
              <strong>{name}</strong>: {detail}
            </li>
          ))}
        </ul>
      ) : null}
      <div className={styles.actions}>
        {onRetry ? (
          <button type="button" className={styles.retry} onClick={onRetry}>
            Retry
          </button>
        ) : null}
        {(backHref || isNotFound) && (
          <Link href={backHref ?? "/tickets"} className={styles.back}>
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
