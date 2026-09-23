# Frontend MVP — manual acceptance checklist (F8)

Use with backend on `http://localhost:8080` and frontend on `http://localhost:3000`.

## Screens / navigation

- [ ] `/` redirects to `/tickets`
- [ ] App shell shows Tickets and New ticket links
- [ ] Unknown route shows not-found with link back to list

## Ticket list (`/tickets`)

- [ ] Tickets load from API (or empty state if none)
- [ ] Empty state offers **Create ticket**
- [ ] Search by keyword filters title/description
- [ ] Status filter reloads list immediately
- [ ] Search + status can be combined
- [ ] Clear resets to full list
- [ ] API down → error banner + Retry
- [ ] Row click opens ticket detail
- [ ] Create ticket navigates to `/tickets/new`

## Create ticket (`/tickets/new`)

- [ ] Blank submit shows field errors
- [ ] Valid submit creates ticket and returns to list
- [ ] Cancel returns to list without creating
- [ ] New ticket appears on list afterward
- [ ] Open a ticket from the list to edit

## Ticket detail (`/tickets/{id}`)

- [ ] Shows title, description, priority, status, assignee, timestamps
- [ ] Save updates fields and returns to list
- [ ] Reset restores last saved field values
- [ ] Validation errors show near fields
- [ ] Unknown id → not-found message + back to list

## Status + comments

- [ ] Status control shows only allowed next statuses
- [ ] Valid transition updates status badge
- [ ] Terminal status (`CLOSED` / `CANCELLED`) hides change control
- [ ] Comments list oldest → newest
- [ ] Add comment appends to list
- [ ] Blank comment shows field error

## Errors / durability (cross-check)

- [ ] UI shows meaningful API error messages
- [ ] After backend restart, tickets/comments still present (file H2 / DB)
- [ ] No secrets committed (`.env.local` ignored; use `.env.example`)

## Spec mapping

Aligned with `spec/ui-flow.md` and acceptance criteria in `spec/requirements.md` §6 (UI-facing items).
