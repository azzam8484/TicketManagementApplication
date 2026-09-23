# Architecture (Detailed)
## Purpose of this document
This document defines the **technical architecture** of the Ticket Management System MVP (**Tickr**):
- system context and boundaries
- runtime components and how they interact
- backend and frontend internal structure
- request/response and write-path flows
- where validation and status rules are enforced
- persistence, configuration, and error-handling approach
- architectural decisions and MVP constraints

**MVP status:** Complete. Product behavior is frozen in `requirements.md` and `ui-flow.md`.



## 1. Goals and non-goals
### 1.1 Architecture goals (MVP)
- Support all MVP capabilities in `requirements.md` with a clear split: UI ↔ API ↔ DB
- Keep backend as the **authority** for validation and status transitions
- Persist tickets and comments so data survives process restart
- Keep the system simple enough to implement and review quickly
- Allow local development with **file-based H2** (data survives restart) and production-like use with PostgreSQL
### 1.2 Non-goals (MVP)
- Microservices / multi-service backend split
- Authentication, authorization, multi-tenancy
- Event bus, message queue, CQRS, or eventual consistency
- Caching layer (Redis, etc.)
- File attachments, notifications, audit log product features
- Real-time updates (WebSockets)



## 2. System context
### 2.1 Actors
| Actor | Interaction |
|---|---|
| End user (browser) | Uses the web UI to manage tickets |
| Frontend application | Renders UI and calls backend REST API |
| Backend application | Validates, applies rules, persists data |
| Database | Stores tickets and comments durably |
No external identity provider or third-party integrations in MVP.
### 2.2 Context diagram
```text
                    ┌──────────────────────────────────────────┐
                    │         Ticket Management System         │
                    │                                          │
  ┌────────┐        │  ┌────────────┐      ┌───────────────┐   │
  │  User  │───────►│  │ Frontend   │─────►│   Backend     │   │
  │Browser │◄───────│  │ Web App    │◄─────│   REST API    │   │
  └────────┘        │  └────────────┘      └───────┬───────┘   │
                    │                              │           │
                    │                              ▼           │
                    │                      ┌───────────────┐   │
                    │                      │   Database    │   │
                    │                      └───────────────┘   │
                    └──────────────────────────────────────────┘



┌──────────────────────────────┐
│ Frontend (React / Next.js)   │
│ - Routes / Pages             │
│ - Feature UI components      │
│ - API client                 │
│ - Error presentation         │
└──────────────┬───────────────┘
               │ HTTPS/HTTP + JSON
               │ REST /api/v1/...
┌──────────────▼───────────────┐
│ Backend (Spring Boot)        │
│ - Controllers                │
│ - DTOs + Bean Validation     │
│ - Services (domain logic)    │
│ - State transition policy    │
│ - Repositories (JPA)         │
│ - Global exception handler   │
└──────────────┬───────────────┘
               │ JDBC
┌──────────────▼───────────────┐
│ Database                     │
│ - PostgreSQL (prod)          │
│ - File-based H2 (local)      │
│ - Flyway migrations          │
└──────────────────────────────┘

### Database profiles (implemented)

| Profile | Database | Persistence across restart |
|---|---|---|
| `local` (default) | File-based H2 at `backend/data/ticketdb` | Yes — data stored on disk |
| `prod` | PostgreSQL (via env vars) | Yes |

Notes:

- Do **not** use in-memory H2 (`jdbc:h2:mem:...`) for the MVP local profile; it loses data on restart and fails the persistence acceptance criterion.
- Schema is applied by Flyway (`db/migration`), not by Hibernate `ddl-auto`.
- Local DB files under `backend/data/` are gitignored; they are machine-local only.
- Run the backend from the `backend/` directory so the H2 file path `./data/ticketdb` resolves correctly.