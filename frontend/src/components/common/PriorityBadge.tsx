import type { TicketPriority } from "@/types/ticket";
import { formatPriorityLabel } from "@/components/common/labels";
import styles from "./PriorityBadge.module.css";

const PRIORITY_CLASS: Record<TicketPriority, string> = {
  LOW: styles.low,
  MEDIUM: styles.medium,
  HIGH: styles.high,
};

type PriorityBadgeProps = {
  priority: TicketPriority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`${styles.badge} ${PRIORITY_CLASS[priority]}`}>
      {formatPriorityLabel(priority)}
    </span>
  );
}
