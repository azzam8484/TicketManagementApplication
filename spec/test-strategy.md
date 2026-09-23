# Test Strategy

## Purpose of this document

Defines **how MVP behavior is verified**:

- what to test
- test levels (unit, integration, UI/manual)
- priority cases, especially the status state machine
- mapping from acceptance criteria to tests

It does not redefine product features, API payloads, or UI layouts.  
Those are in `requirements.md`, `api-contract.md`, `state-machine.md`, and `ui-flow.md`.

## 1. Goals

- Prove all acceptance criteria in `requirements.md`
- Prove valid status transitions succeed and invalid ones are rejected by the backend
- Prove backend validation and durable persistence
- Keep tests focused on MVP only

## 2. Test levels

| Level | Scope | Tools (suggested) | Required for MVP? |
|---|---|---|---|
| Unit | Service logic, state-transition policy, validation helpers | JUnit 5, Mockito | Yes (core logic) |
| Integration (API/DB) | REST endpoints + DB + state machine end-to-end on backend | `@SpringBootTest` / MockMvc or TestRestTemplate; DB or Testcontainers | **Yes (mandatory for state machine)** |
| UI / E2E | Browser flows against running app | Manual checklist for MVP; optional Playwright/Cypress later | Manual minimum; automation optional |
| Static / process | Secrets not committed | Repo review / git hygiene | Yes |

### Ownership

| Concern | Where tested |
|---|---|
| State transition rules | Unit (policy) + Integration (API) |
| Request validation | Integration (API `400`) |
| Persistence / restart | Integration or manual restart check |
| UI error display | Manual UI checklist (minimum) |
| Search / filter | Integration (API) + manual UI |

## 3. Backend unit tests

### 3.1 State transition policy

Test the pure transition rules without HTTP:

| Case | Expectation |
|---|---|
| `OPEN → IN_PROGRESS` | allowed |
| `OPEN → CANCELLED` | allowed |
| `IN_PROGRESS → RESOLVED` | allowed |
| `IN_PROGRESS → CANCELLED` | allowed |
| `RESOLVED → CLOSED` | allowed |
| `CLOSED → OPEN` | rejected |
| `RESOLVED → OPEN` | rejected |
| `CANCELLED → OPEN` | rejected |
| `OPEN → CLOSED` | rejected |
| `IN_PROGRESS → CLOSED` | rejected |
| `CLOSED → *` | rejected |
| `CANCELLED → *` | rejected |
| same status → same status | rejected |

### 3.2 Ticket service (optional but recommended)

- create sets status `OPEN`
- field update does not change status
- comment requires existing ticket

## 4. Backend integration tests (mandatory)

Use real HTTP API against the application with a database.

### 4.1 Ticket CRUD / fields

| Test | Expectation |
|---|---|
| Create ticket with valid body | `201`, status `OPEN`, fields persisted |
| Create with missing title/description/priority | `400 VALIDATION_ERROR` |
| Get ticket by id | `200` with ticket data |
| Get unknown id | `404 NOT_FOUND` |
| Update title/description/priority/assignee | `200`, values changed, status unchanged |
| Update with blank title | `400` |

### 4.2 Comments

| Test | Expectation |
|---|---|
| Add comment to existing ticket | `201`, comment returned |
| Add blank comment | `400` |
| Add comment to missing ticket | `404` |
| Get ticket details includes comments | comments listed in order |

### 4.3 Search and filter

| Test | Expectation |
|---|---|
| List all | `200` with items |
| Filter by status | only matching status returned |
| Search by keyword in title | matching tickets returned |
| Search by keyword in description | matching tickets returned |
| Search + status together | AND behavior |
| Invalid status query param | `400` |

### 4.4 State machine (acceptance-critical)

#### Valid transitions

| Steps | Expectation |
|---|---|
| Create → `OPEN` | create succeeds |
| `OPEN → IN_PROGRESS` | `200`, status updated |
| `IN_PROGRESS → RESOLVED` | `200` |
| `RESOLVED → CLOSED` | `200` |
| `OPEN → CANCELLED` | `200` |
| `IN_PROGRESS → CANCELLED` | `200` |

#### Invalid transitions

| Case | Expectation |
|---|---|
| `CLOSED → OPEN` | `409 INVALID_STATUS_TRANSITION`, status remains `CLOSED` |
| `RESOLVED → OPEN` | `409`, status unchanged |
| `CANCELLED → OPEN` | `409`, status unchanged |
| `OPEN → RESOLVED` | `409` |
| `IN_PROGRESS → CLOSED` | `409` |
| Status sent via field-update API | `400` (status not allowed on field update) |

### 4.5 Persistence / restart

| Test | Expectation |
|---|---|
| Create ticket (+ optional comment), restart app (or new connection / new context with same DB), fetch again | data still present |

How to run this check locally:

1. Start backend with profile `local` (file-based H2 under `backend/data/`)
2. Create a ticket (and optional comment) via API
3. Stop the app completely
4. Start again from `backend/`
5. Fetch the same ticket by id — data must still be present

Notes:

- Local MVP uses **file-based H2** (`jdbc:h2:file:./data/ticketdb`), which survives restart.
- In-memory H2 (`jdbc:h2:mem:...`) is **not** used for MVP local and is **not** enough to prove restart survival.
- For automated CI, prefer PostgreSQL (Testcontainers) or the same file-based H2 path.

## 5. Frontend / UI verification (MVP minimum = manual)

Run against a live backend.

| # | Check | Pass criteria |
|---|---|---|
| 1 | Create ticket from UI | Ticket appears; detail shows `OPEN` |
| 2 | List tickets | Created tickets visible |
| 3 | View details | Fields + comments visible |
| 4 | Update fields | Changes saved and shown |
| 5 | Change assignee | Assignee updated |
| 6 | Add comment | Comment appears on detail |
| 7 | Search | Keyword narrows list |
| 8 | Status filter | Filter narrows list |
| 9 | Valid status changes | Happy path and cancel path work |
| 10 | Invalid status | Error message shown; status unchanged |
| 11 | Validation errors | Meaningful field/page errors on bad input |
| 12 | Not found / API failure | Meaningful error shown |

Automated E2E is optional after MVP manual pass.

## 6. Process / security checks

| Check | Pass criteria |
|---|---|
| No secrets committed | No passwords, tokens, private keys, or real credentials in git |
| Config | Secrets via env / external config only |

## 7. Acceptance criteria → test map

| Acceptance criterion | Covered by |
|---|---|
| Ticket can be created from UI | UI #1 + API create integration |
| Tickets can be listed | UI #2 + list integration |
| Ticket details can be viewed | UI #3 + get-by-id integration |
| Ticket fields can be updated | UI #4 + update integration |
| Assignee can be changed | UI #5 + update integration |
| Ticket status can be changed for valid transitions | UI #9 + state machine valid tests |
| Comments can be added | UI #6 + comment integration |
| Search works | UI #7 + search integration |
| Status filter works | UI #8 + filter integration |
| Valid status transitions work | State machine valid tests |
| Invalid status transitions rejected by backend | State machine invalid tests (`409`) |
| Data survives application restart | Persistence/restart test |
| Backend validation works | Create/update/comment `400` tests |
| UI shows meaningful errors | UI #10–12 |
| State-machine integration tests pass | Section 4.4 |
| No secrets are committed | Section 6 |

## 8. Test data guidelines

- Use isolated data per test (create fresh tickets)
- Do not depend on test execution order
- Prefer explicit statuses set via API transitions (not DB hacks), except when seeding illegal current states for rejection tests
- Reuse sample shapes from `api-contract.md` dummy payloads where helpful

## 9. Definition of done (testing)

MVP testing is done when:

1. Mandatory backend integration tests in section 4 pass (including full state-machine set)
2. Manual UI checklist in section 5 passes
3. Restart persistence check passes
4. No secrets are present in the repository

## 10. Out of scope for MVP testing

- Performance / load testing
- Security penetration testing
- Cross-browser matrix beyond basic manual check
- Full E2E automation suite (optional later)
- Testing features not in `requirements.md`
