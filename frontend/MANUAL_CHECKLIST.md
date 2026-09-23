# Frontend MVP — manual acceptance checklist (F8)

Use with backend on `http://localhost:8080` and frontend on `http://localhost:3000`.

Aligned with the **final** product described in `spec/ui-flow.md` and `spec/requirements.md`.

## Screens / navigation

- [x] `/` redirects to `/tickets`
- [x] App shell shows Tickets nav + New Ticket
- [x] Unknown route shows not-found with link back to list

## Ticket list (`/tickets`)

- [x] Tickets load from API (or empty state if none)
- [x] Summary cards (Total / Open / In Progress / Resolved); Resolved = RESOLVED only
- [x] Sidebar status counts + card click filters list and highlights active card
- [x] Header count matches filtered list
- [x] Search by keyword filters title/description
- [x] Status filter reloads list
- [x] Search + status can be combined
- [x] Clear resets to full list
- [x] API down → error banner + Retry
- [x] Row click opens **read-only** ticket detail
- [x] **Edit** (right of Updated) opens edit (`?edit=1`)
- [x] Create / New Ticket navigates to `/tickets/new`

## Create ticket (`/tickets/new`)

- [x] Empty / digits-only title or description shows field errors from API
- [x] Valid submit creates ticket and returns to **list**
- [x] Cancel returns to list without creating
- [x] New ticket appears on list afterward

## Ticket detail — view (`/tickets/{id}`)

- [x] Shows title, description, priority, status, assignee, timestamps
- [x] Comments listed read-only (no add form)
- [x] No status change control
- [x] Unknown id → not-found message + back to list

## Ticket edit (`/tickets/{id}?edit=1`)

- [x] Editable title, description, priority, assignee
- [x] Save updates fields and returns to list
- [x] Cancel returns to view
- [x] Validation errors show under fields (blank / digits-only)
- [x] Status control shows only allowed next statuses
- [x] Valid transition updates status
- [x] Terminal status hides change control
- [x] Add comment appends to list and advances Updated
- [x] Blank comment shows field error

## Errors / durability

- [x] UI shows meaningful API error messages
- [x] After backend restart, tickets/comments still present (file H2 / DB)
- [x] No secrets committed (`.env.local` ignored; use `.env.example`)

## Spec mapping

Final product: `spec/requirements.md` §6 (acceptance checked), `spec/ui-flow.md`, `spec/api-contract.md`, `spec/data-model.md`.
