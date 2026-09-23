# State Machine

## Purpose of this document

Defines the **ticket status lifecycle** for MVP:

- allowed statuses
- allowed transitions
- terminal states
- rejection rules for invalid transitions

Status values are stored on the Ticket entity (`data-model.md`).  
The change-status API is defined in `api-contract.md`.  
The backend is the authority that enforces these rules.

## 1. Statuses

| Status | Type | Meaning |
|---|---|---|
| `OPEN` | Initial | Ticket created; work not started |
| `IN_PROGRESS` | Active | Work has started |
| `RESOLVED` | Active | Work finished; waiting to close |
| `CLOSED` | Terminal | Completed and closed |
| `CANCELLED` | Terminal | Cancelled; no further work |

### Initial status

- Every new ticket starts as `OPEN`
- Clients cannot create a ticket in any other status

### Terminal statuses

- `CLOSED` — no outgoing transitions
- `CANCELLED` — no outgoing transitions

## 2. Allowed transitions

| From | To | Meaning |
|---|---|---|
| `OPEN` | `IN_PROGRESS` | Start work |
| `OPEN` | `CANCELLED` | Cancel before work starts |
| `IN_PROGRESS` | `RESOLVED` | Mark work done |
| `IN_PROGRESS` | `CANCELLED` | Cancel after work started |
| `RESOLVED` | `CLOSED` | Close resolved ticket |

### Happy path

```text
OPEN → IN_PROGRESS → RESOLVED → CLOSED
```

### Cancel paths

```text
OPEN → CANCELLED
IN_PROGRESS → CANCELLED
```

### Transition diagram

```text
                 cancel
        ┌──────────────────────► CANCELLED
        │                           ▲
        │                           │
        │                           │ cancel
        │                           │
      OPEN ──────► IN_PROGRESS ──────┤
                     │
                     │ resolve
                     ▼
                 RESOLVED ──────► CLOSED
                        close
```

## 3. Transition matrix

Rows = current status. Columns = target status.  
`Y` = allowed. blank = rejected.

| From \ To | OPEN | IN_PROGRESS | RESOLVED | CLOSED | CANCELLED |
|---|---|---|---|---|---|
| OPEN | | Y | | | Y |
| IN_PROGRESS | | | Y | | Y |
| RESOLVED | | | | Y | |
| CLOSED | | | | | |
| CANCELLED | | | | | |

Notes:

- Same-status transitions (e.g. `OPEN → OPEN`) are **not** allowed
- Only the `Y` cells above are valid

## 4. Invalid transitions (must be rejected)

Any transition not listed in section 2 is invalid.

### Explicit examples (required by product)

| From | To | Result |
|---|---|---|
| `CLOSED` | `OPEN` | Reject |
| `RESOLVED` | `OPEN` | Reject |
| `CANCELLED` | `OPEN` | Reject |
| `CLOSED` | any other status | Reject |
| `CANCELLED` | any other status | Reject |

### Other common invalid examples

| From | To | Why invalid |
|---|---|---|
| `OPEN` | `RESOLVED` | Must go through `IN_PROGRESS` |
| `OPEN` | `CLOSED` | Must follow happy path |
| `IN_PROGRESS` | `OPEN` | No going backward |
| `IN_PROGRESS` | `CLOSED` | Must go through `RESOLVED` |
| `RESOLVED` | `IN_PROGRESS` | No reopen in MVP |
| `RESOLVED` | `CANCELLED` | Not allowed in MVP |

## 5. Enforcement rules

1. Status changes happen only through the dedicated status-change use case/API.
2. Field-update must not accept or change `status`.
3. Before saving a new status:
   - load current ticket status
   - check `(current → target)` against the allowed set
   - if not allowed → reject; do not update the ticket
4. On rejection, return a clear error (API: `409 INVALID_STATUS_TRANSITION`).
5. UI may hide illegal next statuses for usability, but backend remains the source of truth.

## 6. Allowed next statuses (helper view)

Useful for UI status controls and tests:

| Current | Allowed next |
|---|---|
| `OPEN` | `IN_PROGRESS`, `CANCELLED` |
| `IN_PROGRESS` | `RESOLVED`, `CANCELLED` |
| `RESOLVED` | `CLOSED` |
| `CLOSED` | _(none)_ |
| `CANCELLED` | _(none)_ |

## 7. Persistence behavior

| Event | Data effect |
|---|---|
| Valid transition | Update `Ticket.status`; update `Ticket.updatedAt` |
| Invalid transition | No status change; no `updatedAt` change |
| Create ticket | Insert with `status = OPEN` |

## 8. Out of scope for MVP state machine

- Reopening (`CLOSED → OPEN`, `RESOLVED → OPEN`, etc.)
- Skipping steps (`OPEN → RESOLVED`, `IN_PROGRESS → CLOSED`)
- Parallel statuses or custom workflows per team
- Time-based automatic transitions
