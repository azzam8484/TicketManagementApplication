# UI Flow

## Purpose of this document

Defines the **MVP user interface flows**:

- screens/pages
- what the user can do on each screen
- navigation between screens
- which API each action calls
- how errors are shown

It does not redefine API payloads, database fields, or status transition rules.  
Those are in `api-contract.md`, `data-model.md`, and `state-machine.md`.

## 1. Screens (MVP)

| Screen | Route (suggested) | Purpose |
|---|---|---|
| Ticket List | `/tickets` | Browse, search, filter tickets; open create |
| Create Ticket | `/tickets/new` | Create a new ticket |
| Ticket Detail | `/tickets/{id}` | View details, edit fields, change status, add comments |

Suggested default landing page: **Ticket List**.

## 2. Global UI behavior

- All data is loaded from the backend API (no local-only source of truth).
- While waiting for API responses, show a loading state on the affected section or page.
- On API failure, show a **meaningful error message** from the response (`message`, and field errors when present).
- Do not silently ignore failed create/update/status/comment actions.

### Error display rules

| Error type | How to show |
|---|---|
| Validation (`400`) | Show summary + per-field messages near the form fields |
| Not found (`404`) | Show page-level message; offer link back to list |
| Invalid transition (`409`) | Show clear message near status control |
| Server error (`500`) | Show generic “Something went wrong” plus optional details message |

## 3. Screen flows

### 3.1 Ticket List

#### What user sees

- List/table of tickets with at least: title, status, priority, assignee
- Search input (keyword)
- Status filter control (All + each status)
- Button/link: **Create ticket**
- Each row is clickable (or has a View action) → Ticket Detail

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Open list page | Load tickets | `GET /api/v1/tickets` |
| Enter keyword + search/submit | Reload list with keyword | `GET /api/v1/tickets?keyword={q}` |
| Change status filter | Reload list with status | `GET /api/v1/tickets?status={status}` |
| Combine search + filter | Reload with both params | `GET /api/v1/tickets?keyword={q}&status={status}` |
| Clear search/filter | Reload full list | `GET /api/v1/tickets` |
| Click Create | Navigate to Create Ticket | none |
| Click a ticket | Navigate to Ticket Detail | none (detail page loads its own API) |

#### Empty / error states

- No tickets: show empty state (“No tickets found”)
- API failure: show error banner; keep retry option if possible

#### Flow diagram

```text
[Ticket List]
   │
   ├─ Search / Filter ──► refresh list
   ├─ Create Ticket ────► [Create Ticket]
   └─ Open row ─────────► [Ticket Detail]
```

---

### 3.2 Create Ticket

#### What user sees

Form fields:

- Title (required)
- Description (required)
- Priority (required): `LOW` | `MEDIUM` | `HIGH`
- Assignee (optional)

Actions:

- **Create** / Save
- **Cancel** → back to Ticket List

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Submit valid form | Create ticket, then go to Detail (or List) | `POST /api/v1/tickets` |
| Submit invalid form | Show field errors; stay on page | none, or API `400` |
| Cancel | Navigate to list without saving | none |

#### Recommended success path

1. User fills form
2. `POST /api/v1/tickets`
3. On `201`, navigate to `/tickets/{id}` (detail of created ticket)

#### Flow diagram

```text
[Ticket List] → [Create Ticket]
                    │
                    ├─ Cancel → [Ticket List]
                    └─ Submit → API create
                                  ├─ success → [Ticket Detail]
                                  └─ error → stay + show errors
```

---

### 3.3 Ticket Detail

#### What user sees

**Ticket info**
- Title, description, priority, status, assignee
- Created / updated timestamps

**Edit fields**
- Editable: title, description, priority, assignee
- Save changes action

**Status control**
- Current status displayed
- Control to choose an **allowed next status** only (from state machine)
- For terminal statuses (`CLOSED`, `CANCELLED`): no status change control (or disabled)

**Comments**
- List of comments (oldest → newest)
- Add-comment form (text + submit)

**Navigation**
- Back to list

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Open detail page | Load ticket + comments | `GET /api/v1/tickets/{id}` |
| Save field edits | Update fields, refresh shown data | `PATCH /api/v1/tickets/{id}` |
| Change status | Send new status; refresh ticket | `PATCH /api/v1/tickets/{id}/status` |
| Invalid status attempt | Show `409` message; keep old status | same status API |
| Add comment | Post comment; append/reload comments | `POST /api/v1/tickets/{id}/comments` |
| Back | Navigate to list | none |

#### Status control UX rule

- Show only allowed next statuses for current status (see `state-machine.md` section “Allowed next statuses”)
- Backend still enforces rules if bypassed

#### Flow diagram

```text
[Ticket List] → [Ticket Detail]
                    │
                    ├─ Edit fields → PATCH fields → refresh
                    ├─ Change status → PATCH status
                    │                    ├─ success → refresh
                    │                    └─ 409 → show error
                    ├─ Add comment → POST comment → refresh comments
                    └─ Back → [Ticket List]
```

## 4. End-to-end user journeys

### Journey A — Create and view

1. Open List  
2. Click Create  
3. Submit form  
4. Land on Detail of new ticket (`OPEN`)

### Journey B — Search and filter

1. Open List  
2. Enter keyword and/or choose status  
3. See matching tickets  
4. Open one ticket

### Journey C — Update and comment

1. Open Detail  
2. Edit title/assignee and save  
3. Add a comment  
4. See updated fields and new comment

### Journey D — Valid status path

1. Open Detail (`OPEN`)  
2. Move to `IN_PROGRESS`  
3. Move to `RESOLVED`  
4. Move to `CLOSED`  
5. Status control no longer offers further transitions

### Journey E — Invalid status rejected

1. Ticket is `CLOSED` (or user forces illegal target)  
2. Status change request sent  
3. UI shows meaningful error from backend  
4. Status remains unchanged

### Journey F — Cancel ticket

1. Ticket is `OPEN` or `IN_PROGRESS`  
2. User selects `CANCELLED`  
3. Status becomes `CANCELLED`  
4. No further status changes available

## 5. Screen → API map

| Screen | APIs used |
|---|---|
| Ticket List | `GET /api/v1/tickets` (+ query params) |
| Create Ticket | `POST /api/v1/tickets` |
| Ticket Detail | `GET /api/v1/tickets/{id}` |
| Ticket Detail (edit) | `PATCH /api/v1/tickets/{id}` |
| Ticket Detail (status) | `PATCH /api/v1/tickets/{id}/status` |
| Ticket Detail (comment) | `POST /api/v1/tickets/{id}/comments` |

## 6. Out of scope for MVP UI

- Login / signup pages
- Delete ticket UI
- Edit/delete comment UI
- Dashboards, analytics, kanban board
- Real-time updates without refresh
- Responsive design polish beyond usable desktop + basic mobile layout
