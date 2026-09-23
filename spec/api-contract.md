# API Contract

## Purpose of this document

Defines the MVP REST API: endpoints, request bodies, query params, HTTP statuses, error shape, and **dummy request/response examples** for each API.

## 1. General conventions

| Item | Convention |
|---|---|
| Base URL | `/api/v1` |
| Format | JSON |
| Field naming | camelCase |
| Timestamps | ISO-8601 UTC |
| IDs | UUID strings |
| Auth | None in MVP |

### Error response shape

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "title": "Title is required",
    "description": "Description cannot be only digits"
  }
}
```

| HTTP | `code` | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid/missing input (blank, digits-only title/description, bad enum, etc.) |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `INVALID_STATUS_TRANSITION` | Illegal status change |
| 500 | `INTERNAL_ERROR` | Unexpected failure |

---

## 2. API list

| # | Method | Path | Purpose |
|---|---|---|---|
| 1 | `POST` | `/api/v1/tickets` | Create ticket |
| 2 | `GET` | `/api/v1/tickets` | List / search / filter tickets |
| 3 | `GET` | `/api/v1/tickets/{id}` | Get ticket details + comments |
| 4 | `PATCH` | `/api/v1/tickets/{id}` | Update title, description, priority, assignee |
| 5 | `PATCH` | `/api/v1/tickets/{id}/status` | Change status (state machine) |
| 6 | `POST` | `/api/v1/tickets/{id}/comments` | Add comment |

---

## 3. Endpoints with dummy responses

### 3.1 Create ticket

`POST /api/v1/tickets`

Creates a ticket. Server sets `status` to `OPEN`.

#### Dummy request

```http
POST /api/v1/tickets
Content-Type: application/json
```

```json
{
  "title": "Login button not working",
  "description": "Clicking login on Chrome does nothing.",
  "priority": "HIGH",
  "assignee": "Azzam"
}
```

#### Dummy success response — `201 Created`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Login button not working",
  "description": "Clicking login on Chrome does nothing.",
  "status": "OPEN",
  "priority": "HIGH",
  "assignee": "Azzam",
  "createdAt": "2026-09-23T07:00:00Z",
  "updatedAt": "2026-09-23T07:00:00Z"
}
```

Optional header: `Location: /api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6`

#### Dummy error response — `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "title": "Title is required",
    "priority": "must be one of LOW, MEDIUM, HIGH"
  }
}
```

#### Dummy error response — digits-only title/description — `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "title": "Title cannot be only digits",
    "description": "Description cannot be only digits"
  }
}
```

---

### 3.2 List tickets (search + filter)

`GET /api/v1/tickets`

#### Query parameters

| Param | Required | Description |
|---|---|---|
| `keyword` | no | Match title and description (case-insensitive) |
| `status` | no | Exact status filter |

#### Dummy request (all tickets)

```http
GET /api/v1/tickets
```

#### Dummy request (search + filter)

```http
GET /api/v1/tickets?keyword=login&status=OPEN
```

#### Dummy success response — `200 OK`

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "Login button not working",
      "description": "Clicking login on Chrome does nothing.",
      "status": "OPEN",
      "priority": "HIGH",
      "assignee": "Azzam",
      "createdAt": "2026-09-23T07:00:00Z",
      "updatedAt": "2026-09-23T07:00:00Z"
    },
    {
      "id": "9b2c1d0e-1234-4abc-9def-abcdef012345",
      "title": "Password reset email delayed",
      "description": "Reset mail arrives after 10 minutes.",
      "status": "IN_PROGRESS",
      "priority": "MEDIUM",
      "assignee": "Sara",
      "createdAt": "2026-09-22T11:30:00Z",
      "updatedAt": "2026-09-23T06:10:00Z"
    }
  ]
}
```

#### Dummy success response — empty list — `200 OK`

```json
{
  "items": []
}
```

#### Dummy error response — `400 Bad Request` (invalid status filter)

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid status filter",
  "fields": {
    "status": "must be one of OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED"
  }
}
```

---

### 3.3 Get ticket details

`GET /api/v1/tickets/{id}`

Returns one ticket and its comments.

#### Dummy request

```http
GET /api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6
```

#### Dummy success response — `200 OK`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Login button not working",
  "description": "Clicking login on Chrome does nothing.",
  "status": "OPEN",
  "priority": "HIGH",
  "assignee": "Azzam",
  "createdAt": "2026-09-23T07:00:00Z",
  "updatedAt": "2026-09-23T07:00:00Z",
  "comments": [
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "ticketId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "text": "Reproduced on staging.",
      "createdAt": "2026-09-23T07:15:00Z"
    },
    {
      "id": "1a2b3c4d-5678-40fe-9abc-111122223333",
      "ticketId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "text": "Looks related to disabled submit handler.",
      "createdAt": "2026-09-23T07:20:00Z"
    }
  ]
}
```

#### Dummy success response — no comments — `200 OK`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Login button not working",
  "description": "Clicking login on Chrome does nothing.",
  "status": "OPEN",
  "priority": "HIGH",
  "assignee": null,
  "createdAt": "2026-09-23T07:00:00Z",
  "updatedAt": "2026-09-23T07:00:00Z",
  "comments": []
}
```

#### Dummy error response — `404 Not Found`

```json
{
  "code": "NOT_FOUND",
  "message": "Ticket not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

---

### 3.4 Update ticket fields

`PATCH /api/v1/tickets/{id}`

Updates title, description, priority, and/or assignee. **Does not change status.**

#### Dummy request

```http
PATCH /api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6
Content-Type: application/json
```

```json
{
  "title": "Login button unresponsive",
  "description": "Submit click has no effect on Chrome 128.",
  "priority": "MEDIUM",
  "assignee": "Sara"
}
```

#### Dummy success response — `200 OK`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Login button unresponsive",
  "description": "Submit click has no effect on Chrome 128.",
  "status": "OPEN",
  "priority": "MEDIUM",
  "assignee": "Sara",
  "createdAt": "2026-09-23T07:00:00Z",
  "updatedAt": "2026-09-23T08:05:00Z"
}
```

#### Dummy error response — `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "title": "Title is required"
  }
}
```

#### Dummy error response — `404 Not Found`

```json
{
  "code": "NOT_FOUND",
  "message": "Ticket not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

---

### 3.5 Change ticket status

`PATCH /api/v1/tickets/{id}/status`

Applies a status transition. Invalid transitions are rejected.

#### Dummy request (valid)

```http
PATCH /api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6/status
Content-Type: application/json
```

```json
{
  "status": "IN_PROGRESS"
}
```

#### Dummy success response — `200 OK`

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Login button unresponsive",
  "description": "Submit click has no effect on Chrome 128.",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "assignee": "Sara",
  "createdAt": "2026-09-23T07:00:00Z",
  "updatedAt": "2026-09-23T08:10:00Z"
}
```

#### Dummy error response — `409 Conflict` (invalid transition)

```json
{
  "code": "INVALID_STATUS_TRANSITION",
  "message": "Cannot transition from CLOSED to OPEN"
}
```

#### Dummy error response — `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "status": "must be one of OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED"
  }
}
```

#### Dummy error response — `404 Not Found`

```json
{
  "code": "NOT_FOUND",
  "message": "Ticket not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

---

### 3.6 Add comment

`POST /api/v1/tickets/{id}/comments`

Adds a comment to an existing ticket.

#### Dummy request

```http
POST /api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6/comments
Content-Type: application/json
```

```json
{
  "text": "Reproduced on staging."
}
```

#### Dummy success response — `201 Created`

```json
{
  "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "ticketId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "text": "Reproduced on staging.",
  "createdAt": "2026-09-23T07:15:00Z"
}
```

#### Dummy error response — `400 Bad Request`

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Please fix the highlighted fields.",
  "fields": {
    "text": "Comment is required"
  }
}
```

#### Dummy error response — `404 Not Found`

```json
{
  "code": "NOT_FOUND",
  "message": "Ticket not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

---

## 4. Dummy data reference (shared sample IDs)

| Resource | Dummy ID |
|---|---|
| Ticket | `3fa85f64-5717-4562-b3fc-2c963f66afa6` |
| Comment | `7c9e6679-7425-40de-944b-e07fc1f90ae7` |

## 5. Out of scope for MVP API

- Auth / login
- Delete ticket
- Edit/delete comment
- Pagination (optional later)
- Bulk APIs
