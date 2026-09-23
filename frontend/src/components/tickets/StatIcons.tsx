type StatIconProps = {
  className?: string;
};

export function TotalTicketsIcon({ className }: StatIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 4h10a2 2 0 0 1 2 2v13.2a.8.8 0 0 1-1.25.66L12 16.5l-5.75 3.36A.8.8 0 0 1 5 19.2V6a2 2 0 0 1 2-2Zm0 2v11.2l4.25-2.48a1.5 1.5 0 0 1 1.5 0L17 17.2V6H7Z"
      />
    </svg>
  );
}

export function OpenTicketsIcon({ className }: StatIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function InProgressTicketsIcon({ className }: StatIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M20 12a8 8 0 1 1-2.2-5.5"
      />
      <path
        fill="currentColor"
        d="M20.2 4.8v4.3h-4.3l4.3-4.3Z"
      />
    </svg>
  );
}

export function ResolvedTicketsIcon({ className }: StatIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7.5 10.4 17 4.5 11.2"
      />
    </svg>
  );
}
