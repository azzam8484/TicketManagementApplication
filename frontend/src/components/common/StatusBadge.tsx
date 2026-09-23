import type { TicketStatus } from "@/types/ticket";
import { formatStatusLabel } from "@/components/common/labels";
import styles from "./StatusBadge.module.css";

const STATUS_CLASS: Record<TicketStatus, string> = {
  OPEN: styles.open,
  IN_PROGRESS: styles.inProgress,
  RESOLVED: styles.resolved,
  CLOSED: styles.closed,
  CANCELLED: styles.cancelled,
};

type StatusBadgeProps = {
  status: TicketStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status]}`}>
      {formatStatusLabel(status)}
    </span>
  );
}
