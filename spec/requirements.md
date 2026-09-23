# Ticket Management System — MVP Requirements

## 1. Purpose

Build a Ticket Management System (**Tickr**) with **backend and frontend** that fulfills the MVP capabilities below.

**Status:** MVP is **complete**. Treat this document as the product baseline. Do not add features beyond this scope unless requirements are explicitly extended.

## 2. Scope

### In scope (MVP)

- Frontend UI for all user-facing MVP flows
- Backend REST API with validation and state-machine enforcement
- Database persistence

### Out of scope (until requirements are extended)

- Authentication / authorization / roles
- Notifications, attachments, tags, SLA, analytics
- Soft-delete / archive workflows beyond `CANCELLED` / `CLOSED`
- Any feature not listed in this document

## 3. Functional requirements

### 3.1 Create ticket

- A user can create a ticket from the UI (`/tickets/new`).
- Backend must validate create input and reject invalid payloads.
- On success, UI returns to the ticket list.

**MVP create fields**

- `title` (required; not blank; not digits-only)
- `description` (required; not blank; not digits-only)
- `priority` (required; allowed values: `LOW`, `MEDIUM`, `HIGH`)
- `assignee` (optional; free-text for MVP)

- New tickets start in status `OPEN`.

### 3.2 List tickets

- A user can list tickets from the UI.
- List shows: title, status, priority, assignee (if set), relative updated time, and an **Edit** action.
- Summary cards and sidebar support filtering by status; **Resolved** card counts `RESOLVED` only.
- Clicking a row opens **read-only** ticket details.
- Clicking **Edit** opens the edit experience (`?edit=1`).

### 3.3 View ticket details

- A user can open a ticket and view its details from the UI.
- Details include: title, description, priority, status, assignee, timestamps, and comments (read-only list).
- View mode does **not** allow status change or adding comments.

### 3.4 Update ticket fields

- From **Edit**, a user can update:
  - title
  - description
  - priority
  - assignee
- Backend must validate update input and reject invalid payloads (including blank and digits-only title/description).
- On successful save, UI returns to the ticket list.
- Field validation errors appear under the relevant inputs.

### 3.5 Change ticket status

- From **Edit**, a user can request a status change.
- Backend must enforce the state machine in section 4.
- Valid transitions must succeed.
- Invalid transitions must be rejected by the backend with a clear error.

### 3.6 Add comments

- From **Edit**, a user can add a comment to a ticket.
- Comment includes comment text; backend stores it with the ticket and a created timestamp.
- Adding a comment also updates the ticket’s `updatedAt` (list **Updated** column reflects activity).
- Backend must validate comment input (e.g. non-empty text).

### 3.7 Search tickets

- A user can search tickets by keyword from the UI.
- MVP search matches keyword against ticket **title** and **description**.

### 3.8 Filter tickets by status

- A user can filter the ticket list by status from the UI (sidebar, summary cards, and filter dropdown).
- Filter supports each status value defined in the state machine.

### 3.9 Persist data

- All tickets, status changes, and comments are persisted in a database.
- Data must survive application restart.
- Local profile uses **file-based H2** (not in-memory) so restart survival can be verified during development.
- Production profile uses **PostgreSQL**.

### 3.10 Backend validation

- Backend validates all write operations (create, update fields, status change, add comment).
- Invalid input is rejected with meaningful error responses, including per-field messages where applicable.

### 3.11 UI error display

- UI displays meaningful errors for failed API calls (validation field errors, invalid transitions, not found, and other client-visible failures).

## 4. Status state machine (backend-enforced)

### Allowed statuses

`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `CANCELLED`

### Allowed transitions

| From | To |
|---|---|
| `OPEN` | `IN_PROGRESS` |
| `OPEN` | `CANCELLED` |
| `IN_PROGRESS` | `RESOLVED` |
| `IN_PROGRESS` | `CANCELLED` |
| `RESOLVED` | `CLOSED` |

Implied happy path: `OPEN → IN_PROGRESS → RESOLVED → CLOSED`

### Disallowed transitions (examples; not exhaustive)

Any transition not listed above is invalid and must be rejected, including:

- `CLOSED → OPEN`
- `RESOLVED → OPEN`
- `CANCELLED → OPEN`
- `CLOSED → *` (any further change)
- `CANCELLED → *` (any further change)

Terminal statuses for MVP: `CLOSED`, `CANCELLED` (no outgoing transitions).

## 5. Quality / process requirements

- State-machine behavior is covered by **integration tests** that verify allowed transitions succeed and disallowed transitions are rejected.
- **No secrets** (passwords, API keys, tokens, private credentials) are committed to the repository.

## 6. Acceptance criteria

- [x] Ticket can be created from UI
- [x] Tickets can be listed
- [x] Ticket details can be viewed
- [x] Ticket fields can be updated (title, description, priority)
- [x] Assignee can be changed
- [x] Ticket status can be changed for valid transitions
- [x] Comments can be added
- [x] Search works (title and description)
- [x] Status filter works
- [x] Valid status transitions work
- [x] Invalid status transitions are rejected by backend
- [x] Data survives application restart
- [x] Backend validation works
- [x] UI shows meaningful errors
- [x] State-machine integration tests pass
- [x] No secrets are committed

## 7. Product freeze

MVP requirements above are the final product baseline.  
Further work should only fix defects against this baseline or follow an explicit new requirements change.
