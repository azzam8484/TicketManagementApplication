import styles from "./FormWorkspace.module.css";

type FormWorkspaceProps = {
  title: string;
  actionLabel: string;
  actionFormId: string;
  actionDisabled?: boolean;
  children: React.ReactNode;
};

/**
 * Figma-style page chrome: full-width white top bar + gray body for form pages.
 */
export function FormWorkspace({
  title,
  actionLabel,
  actionFormId,
  actionDisabled = false,
  children,
}: FormWorkspaceProps) {
  return (
    <div className={styles.workspace}>
      <header className={styles.topBar}>
        <h1 className={styles.topTitle}>{title}</h1>
        <button
          type="submit"
          form={actionFormId}
          className={styles.topAction}
          disabled={actionDisabled}
        >
          {actionLabel}
        </button>
      </header>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
