# UI Flow

## Purpose of this document

Defines the **shipped MVP user interface flows** for Tickr:

- screens/pages
- what the user can do on each screen
- navigation between screens
- which API each action calls
- how errors are shown

It does not redefine API payloads, database fields, or status transition rules.  
Those are in `api-contract.md`, `data-model.md`, and `state-machine.md`.

## 1. Screens (MVP)

| Screen | Route | Purpose |
|---|---|---|
| Ticket List | `/tickets` | Browse, search, filter; summary cards; open details or edit |
| Create Ticket | `/tickets/new` | Create a new ticket |
| Ticket Detail (view) | `/tickets/{id}` | Read-only ticket overview + comments |
| Ticket Edit | `/tickets/{id}?edit=1` | Edit fields, change status, add comments |

Suggested default landing page: **Ticket List** (`/` redirects to `/tickets`).

## 2. Global UI behavior

- All data is loaded from the backend API (no local-only source of truth).
- While waiting for API responses, show a loading state on the affected section or page.
- On API failure, show a **meaningful error message** from the response (`message`, and field errors when present).
- Do not silently ignore failed create/update/status/comment actions.

### Error display rules

| Error type | How to show |
|---|---|
| Validation (`400`) with `fields` | Show **per-field messages** under the inputs (friendly text, e.g. “Description is required”). Do not also show a generic top banner when field errors are present. |
| Validation (`400`) without `fields` | Show page-level banner with the API `message` |
| Not found (`404`) | Show page-level message; offer link back to list |
| Invalid transition (`409`) | Show clear message near status control |
| Server error (`500`) | Show generic “Something went wrong” |

## 3. Screen flows

### 3.1 Ticket List

#### What user sees

- Dark sidebar with status navigation counts (All + each status) and **+ New Ticket**
- Summary cards: **Total**, **Open**, **In Progress**, **Resolved** (Resolved count = `RESOLVED` only)
- Clicking a summary card (or sidebar status) filters the list and highlights the active card
- Header count reflects the **current filtered** ticket list
- Search input + status dropdown + Search / Clear
- Table columns: title, status, priority, assignee, updated, **Edit** action
- Each row is clickable → **Ticket Detail (view)**
- **Edit** button (outline + pencil icon, right of Updated) → **Ticket Edit** (`?edit=1`)

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Open list page | Load tickets | `GET /api/v1/tickets` |
| Enter keyword + Search | Reload list with keyword | `GET /api/v1/tickets?keyword={q}` |
| Change status filter / card / sidebar | Reload list with status | `GET /api/v1/tickets?status={status}` |
| Combine search + filter | Reload with both params | `GET /api/v1/tickets?keyword={q}&status={status}` |
| Clear search/filter | Reload full list | `GET /api/v1/tickets` |
| Click Create / New Ticket | Navigate to Create Ticket | none |
| Click a ticket row | Navigate to Ticket Detail (view) | none (detail loads its own API) |
| Click Edit on a row | Navigate to Ticket Edit | none (edit page loads its own API) |

#### Empty / error states

- No tickets: show empty state (“No tickets found”)
- API failure: show error banner; keep retry option if possible

#### Flow diagram

```text
[Ticket List]
   │
   ├─ Search / Filter / Cards ──► refresh list
   ├─ Create Ticket ────────────► [Create Ticket]
   ├─ Open row ─────────────────► [Ticket Detail — view]
   └─ Edit button ──────────────► [Ticket Edit]
```

---

### 3.2 Create Ticket

#### What user sees

Form fields:

- Title (required; not digits-only)
- Description (required; not digits-only)
- Priority (required): `LOW` | `MEDIUM` | `HIGH`
- Assignee (optional)

Actions:

- **Create** / **+ Create Ticket** (always enabled unless submitting)
- **Cancel** → back to Ticket List

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Submit valid form | Create ticket, then go to **List** | `POST /api/v1/tickets` |
| Submit invalid form | Stay on page; show per-field errors from API | API `400` |
| Cancel | Navigate to list without saving | none |

#### Success path

1. User fills form
2. `POST /api/v1/tickets`
3. On `201`, navigate to `/tickets`

#### Flow diagram

```text
[Ticket List] → [Create Ticket]
                    │
                    ├─ Cancel → [Ticket List]
                    └─ Submit → API create
                                  ├─ success → [Ticket List]
                                  └─ error → stay + field errors
```

---

### 3.3 Ticket Detail (view)

Opened by clicking a list row (`/tickets/{id}`).

#### What user sees (read-only)

- Created / updated timestamps and id
- Title, description, status badge, priority, assignee
- Comments list (oldest → newest) — **no** add-comment form
- **No** status change control
- Back to list

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Open detail page | Load ticket + comments | `GET /api/v1/tickets/{id}` |
| Back | Navigate to list | none |

Editing, status changes, and adding comments are done only via **Ticket Edit**.

---

### 3.4 Ticket Edit

Opened by list **Edit** (`/tickets/{id}?edit=1`).

#### What user sees

- Top bar: **Edit Ticket**, **Cancel**, **Save changes**
- Timestamps / id
- **Status control** (allowed next statuses only; terminal = no further changes)
- Editable fields: title, description, priority, assignee
- **Comments** with add-comment form
- Save → returns to list; Cancel → returns to view (`/tickets/{id}`)

#### User actions

| Action | UI behavior | API |
|---|---|---|
| Open edit page | Load ticket + comments | `GET /api/v1/tickets/{id}` |
| Save field edits | Update fields → navigate to list | `PATCH /api/v1/tickets/{id}` |
| Invalid save | Stay on page; show per-field errors | API `400` |
| Change status | Send new status; refresh ticket | `PATCH /api/v1/tickets/{id}/status` |
| Invalid status | Show `409` near status control; keep old status | same status API |
| Add comment | Post comment; append list; ticket `updatedAt` advances | `POST /api/v1/tickets/{id}/comments` |
| Cancel | Navigate to view mode | none |

#### Status control UX rule

- Show only allowed next statuses for current status (see `state-machine.md`)
- Backend still enforces rules if bypassed

#### Flow diagram

```text
[Ticket List] → Edit ──► [Ticket Edit]
                              │
                              ├─ Save fields → PATCH → [Ticket List]
                              ├─ Change status → PATCH status
                              │                    ├─ success → refresh
                              │                    └─ 409 → show error
                              ├─ Add comment → POST → refresh comments
                              └─ Cancel → [Ticket Detail — view]
```

## 4. End-to-end user journeys

### Journey A — Create and list

1. Open List  
2. Click Create  
3. Submit form  
4. Land on List; new ticket is `OPEN`

### Journey B — Search and filter

1. Open List  
2. Enter keyword and/or choose status (sidebar, card, or dropdown)  
3. See matching tickets  
4. Open one ticket (view) or Edit

### Journey C — View, edit, and comment

1. Click row → read-only Detail  
2. From list, click Edit  
3. Change fields and save → List  
4. Or on Edit: add a comment; list **Updated** time advances after comment

### Journey D — Valid status path

1. Open Edit (`OPEN`)  
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
2. On Edit, user selects `CANCELLED`  
3. Status becomes `CANCELLED`  
4. No further status changes available

## 5. Screen → API map

| Screen | APIs used |
|---|---|
| Ticket List | `GET /api/v1/tickets` (+ query params) |
| Create Ticket | `POST /api/v1/tickets` |
| Ticket Detail (view) | `GET /api/v1/tickets/{id}` |
| Ticket Edit (fields) | `GET` + `PATCH /api/v1/tickets/{id}` |
| Ticket Edit (status) | `PATCH /api/v1/tickets/{id}/status` |
| Ticket Edit (comment) | `POST /api/v1/tickets/{id}/comments` |

## 6. Out of scope for MVP UI

- Login / signup pages
- Delete ticket UI
- Edit/delete comment UI
- Dashboards, analytics, kanban board
- Real-time updates without refresh
- Responsive design polish beyond usable desktop + basic mobile layout
