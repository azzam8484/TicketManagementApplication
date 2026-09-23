# Graph Report - TicketManagementApplication  (2026-09-23)

## Corpus Check
- 24 files · ~35,848 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: (none) 11, .mdc 5, .properties 2)

## Summary
- 396 nodes · 419 edges · 26 communities (17 shown, 9 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c75b53f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- 3. Endpoints
- 3.2 List tickets (search + filter)
- Data Model
- 2026-09-22 19:37:04Z
- 3.2 List tickets (search + filter)
- API Contract
- 5. Out of scope for MVP API
- Ticket
- API Contract
- 3.1 Ticket List
- gradlew
- TicketStatus
- TicketManagementApplication
- 2026-09-22_19-37-04Z-hi-is-the-spec.md
- Data Model
- State Machine
- Test Strategy
- UI Flow

## God Nodes (most connected - your core abstractions)
1. `Ticket` - 27 edges
2. `5. Out of scope for MVP API` - 27 edges
3. `2026-09-22 19:37:04Z` - 23 edges
4. `Comment` - 15 edges
5. `TicketStatus` - 14 edges
6. `Data Model` - 13 edges
7. `Data Model` - 13 edges
8. `Test Strategy` - 12 edges
9. `TicketPriority` - 10 edges
10. `State Machine` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Status change` --references--> `TicketStatus`  [INFERRED]
  spec/data-model.md → backend/src/main/java/com/ticketmanagement/domain/TicketStatus.java
- `Request body` --references--> `TicketStatus`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/domain/TicketStatus.java
- `2026-09-22 19:37:04Z` --references--> `TicketManagementApplication`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/TicketManagementApplication.java
- `2. Design choices (MVP)` --references--> `Comment`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/domain/Comment.java
- `2. Design choices (MVP)` --references--> `Ticket`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/domain/Ticket.java

## Import Cycles
- None detected.

## Communities (26 total, 9 thin omitted)

### Community 0 - "3. Endpoints"
Cohesion: 0.08
Nodes (24): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints, Example (+16 more)

### Community 1 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 2 - "Data Model"
Cohesion: 0.08
Nodes (25): 10. Out of model for MVP, 11. ER diagram, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 5.1 Fields (+17 more)

### Community 3 - "2026-09-22 19:37:04Z"
Cohesion: 0.06
Nodes (35): 1. `.cursor/commands/review-code.md`, 1. `.cursor/rules/java-springboot.mdc`, 2026-09-22 19:37:04Z, 2. `.cursor/commands/review-spec.md`, 2. `.cursor/rules/testing.mdc`, 3. `.cursor/commands/generate-tests.md`, 3. `.cursor/rules/api-standards.mdc`, 4. `.cursor/rules/documentation.mdc` (+27 more)

### Community 4 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 5 - "API Contract"
Cohesion: 0.12
Nodes (16): 1. General conventions, 1. Overview, 2. Shared schemas, 4. Endpoint map (summary), 5. Frontend usage mapping, 6. Out of scope for MVP API, API Contract, CommentResponse (+8 more)

### Community 6 - "5. Out of scope for MVP API"
Cohesion: 0.07
Nodes (30): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Build order (from your architecture / MVP), Commit these (Part 1), Constraints we’ll keep (+22 more)

### Community 7 - "Ticket"
Cohesion: 0.07
Nodes (21): Comment, Ticket, column, enumerated, enumtype, fetchtype, generatedvalue, generationtype (+13 more)

### Community 8 - "API Contract"
Cohesion: 0.25
Nodes (7): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Error response shape, Purpose of this document

### Community 9 - "3.1 Ticket List"
Cohesion: 0.12
Nodes (16): 3.1 Ticket List, 3.2 Create Ticket, 3.3 Ticket Detail, 3. Screen flows, Empty / error states, Flow diagram, Flow diagram, Flow diagram (+8 more)

### Community 10 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 13 - "TicketStatus"
Cohesion: 0.07
Nodes (23): TicketPriority, HIGH, LOW, MEDIUM, TicketStatus, CANCELLED, CLOSED, IN_PROGRESS (+15 more)

### Community 14 - "TicketManagementApplication"
Cohesion: 0.40
Nodes (4): TicketManagementApplication, org.springframework.boot.autoconfigure.SpringBootApplication, Not in Part 1 (next parts), springapplication

### Community 22 - "Data Model"
Cohesion: 0.07
Nodes (26): 10. ER diagram, 11. Out of model for MVP, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 5.1 Fields (+18 more)

### Community 24 - "State Machine"
Cohesion: 0.11
Nodes (17): 1. Statuses, 2. Allowed transitions, 3. Transition matrix, 4. Invalid transitions (must be rejected), 5. Enforcement rules, 6. Allowed next statuses (helper view), 7. Persistence behavior, 8. Out of scope for MVP state machine (+9 more)

### Community 25 - "Test Strategy"
Cohesion: 0.09
Nodes (22): 10. Out of scope for MVP testing, 1. Goals, 2. Test levels, 3.1 State transition policy, 3.2 Ticket service (optional but recommended), 3. Backend unit tests, 4.1 Ticket CRUD / fields, 4.2 Comments (+14 more)

### Community 26 - "UI Flow"
Cohesion: 0.13
Nodes (14): 1. Screens (MVP), 2. Global UI behavior, 4. End-to-end user journeys, 5. Screen → API map, 6. Out of scope for MVP UI, Error display rules, Journey A — Create and view, Journey B — Search and filter (+6 more)

## Knowledge Gaps
- **253 isolated node(s):** `LOW`, `MEDIUM`, `HIGH`, `OPEN`, `IN_PROGRESS` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 290 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `API Contract` connect `5. Out of scope for MVP API` to `3.2 List tickets (search + filter)`, `API Contract`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `5. Out of scope for MVP API` connect `5. Out of scope for MVP API` to `TicketStatus`, `TicketManagementApplication`, `Ticket`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `Data Model` connect `Data Model` to `TicketStatus`, `API Contract`, `Ticket`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Ticket` (e.g. with `2. Design choices (MVP)` and `6.1 Ticket → Comment (one-to-many)`) actually correct?**
  _`Ticket` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Comment` (e.g. with `2. Design choices (MVP)` and `6.1 Ticket → Comment (one-to-many)`) actually correct?**
  _`Comment` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `TicketStatus` (e.g. with `4.2 Field rules` and `Status change`) actually correct?**
  _`TicketStatus` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `LOW`, `MEDIUM`, `HIGH` to the rest of the system?**
  _253 weakly-connected nodes found - possible documentation gaps or missing edges._