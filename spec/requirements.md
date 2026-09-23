# Ticket Management System — MVP Requirements

## 1. Purpose

Build a Ticket Management System with **backend and frontend** that fulfills the MVP capabilities below.  
**Do not implement additional features until these requirements and acceptance criteria are met.**

## 2. Scope

### In scope (MVP)

- Frontend UI for all user-facing MVP flows
- Backend REST API with validation and state-machine enforcement
- Database persistence

### Out of scope (until MVP is done)

- Authentication / authorization / roles
- Notifications, attachments, tags, SLA, analytics
- Soft-delete / archive workflows beyond `CANCELLED` / `CLOSED`
- Any feature not listed in this document

## 3. Functional requirements

### 3.1 Create ticket

- A user can create a ticket from the UI.
- Backend must validate create input and reject invalid payloads.

**MVP create fields**

- `title` (required)
- `description` (required)
- `priority` (required; allowed values: `LOW`, `MEDIUM`, `HIGH`)
- `assignee` (optional; free-text for MVP)

- New tickets start in status `OPEN`.

### 3.2 List tickets

- A user can list tickets from the UI.
- List shows at least: title, status, priority, assignee (if set).

### 3.3 View ticket details

- A user can open a ticket and view its details from the UI.
- Details include: title, description, priority, status, assignee, timestamps (created/updated as available), and comments.

### 3.4 Update ticket fields

- A user can update from the UI:
  - title
  - description
  - priority
  - assignee
- Backend must validate update input and reject invalid payloads.

### 3.5 Change ticket status

- A user can request a status change from the UI.
- Backend must enforce the state machine in section 4.
- Valid transitions must succeed.
- Invalid transitions must be rejected by the backend with a clear error.

### 3.6 Add comments

- A user can add a comment to a ticket from the UI.
- Comment includes comment text; backend stores it with the ticket and a created timestamp.
- Backend must validate comment input (e.g. non-empty text).

### 3.7 Search tickets

- A user can search tickets by keyword from the UI.
- MVP search matches keyword against ticket **title** and **description**.

### 3.8 Filter tickets by status

- A user can filter the ticket list by status from the UI.
- Filter supports each status value defined in the state machine.

### 3.9 Persist data

- All tickets, status changes, and comments are persisted in a database.
- Data must survive application restart.
- Local profile uses **file-based H2** (not in-memory) so restart survival can be verified during development.
- Production profile uses **PostgreSQL**.

### 3.10 Backend validation

- Backend validates all write operations (create, update fields, status change, add comment).
- Invalid input is rejected with meaningful error responses (not generic failures only).

### 3.11 UI error display

- UI displays meaningful errors for failed API calls (validation errors, invalid transitions, not found, and other client-visible failures).

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

- [ ] Ticket can be created from UI
- [ ] Tickets can be listed
- [ ] Ticket details can be viewed
- [ ] Ticket fields can be updated (title, description, priority)
- [ ] Assignee can be changed
- [ ] Ticket status can be changed for valid transitions
- [ ] Comments can be added
- [ ] Search works (title and description)
- [ ] Status filter works
- [ ] Valid status transitions work
- [ ] Invalid status transitions are rejected by backend
- [ ] Data survives application restart
- [ ] Backend validation works
- [ ] UI shows meaningful errors
- [ ] State-machine integration tests pass
- [ ] No secrets are committed

## 7. Implementation rule

Implement only what is required in this document.  
Additional features are allowed only after all acceptance criteria above are met.