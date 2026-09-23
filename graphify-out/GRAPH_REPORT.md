# Graph Report - TicketManagementApplication  (2026-09-23)

## Corpus Check
- 41 files · ~43,816 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 18 file(s) not represented in the graph (top: (none) 8, .mdc 5, .properties 2)

## Summary
- 562 nodes · 734 edges · 25 communities (19 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1234eda7`
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
- GlobalExceptionHandler.java
- Ticket
- UI Flow
- gradlew
- TicketStatus
- TicketPriority
- 2026-09-22_19-37-04Z-hi-is-the-spec.md
- Documentation Skills
- Architecture (Detailed)
- Data Model
- 3. Functional requirements
- State Machine
- Test Strategy

## God Nodes (most connected - your core abstractions)
1. `5. Out of scope for MVP API` - 55 edges
2. `TicketStatus` - 38 edges
3. `Ticket` - 36 edges
4. `2026-09-22 19:37:04Z` - 23 edges
5. `Comment` - 22 edges
6. `TicketPriority` - 19 edges
7. `Data Model` - 14 edges
8. `Data Model` - 13 edges
9. `3. Functional requirements` - 12 edges
10. `Test Strategy` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Status change` --references--> `TicketStatus`  [INFERRED]
  spec/data-model.md → backend/src/main/java/com/ticketmanagement/domain/TicketStatus.java
- `Request body` --references--> `TicketStatus`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/domain/TicketStatus.java
- `Responses` --references--> `CommentResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/CommentResponse.java
- `Responses` --references--> `TicketDetailResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketDetailResponse.java
- `Responses` --references--> `TicketResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketResponse.java

## Import Cycles
- None detected.

## Communities (25 total, 6 thin omitted)

### Community 0 - "3. Endpoints"
Cohesion: 0.08
Nodes (24): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints, Example (+16 more)

### Community 1 - "3.2 List tickets (search + filter)"
Cohesion: 0.05
Nodes (40): 1. General conventions, 2. API list, 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment (+32 more)

### Community 2 - "Data Model"
Cohesion: 0.06
Nodes (31): 10. Out of model for MVP, 11. ER diagram, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+23 more)

### Community 3 - "2026-09-22 19:37:04Z"
Cohesion: 0.05
Nodes (39): TicketManagementApplication, org.springframework.boot.autoconfigure.SpringBootApplication, 1. `.cursor/commands/review-code.md`, 1. `.cursor/rules/java-springboot.mdc`, 2026-09-22 19:37:04Z, 2. `.cursor/commands/review-spec.md`, 2. `.cursor/rules/testing.mdc`, 3. `.cursor/commands/generate-tests.md` (+31 more)

### Community 4 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 5 - "API Contract"
Cohesion: 0.09
Nodes (22): 1. General conventions, 1. General conventions, 1. Overview, 2. API list, 2. Shared schemas, 4. Dummy data reference (shared sample IDs), 4. Endpoint map (summary), 5. Frontend usage mapping (+14 more)

### Community 6 - "5. Out of scope for MVP API"
Cohesion: 0.04
Nodes (51): 5. Out of scope for MVP API, Build order (from your architecture / MVP), Change, Commit these (Part 1), Constraints we’ll keep, Do **not** commit, Flow locally, How data *can* survive restart (+43 more)

### Community 7 - "GlobalExceptionHandler.java"
Cohesion: 0.16
Nodes (17): ErrorResponse, GlobalExceptionHandler, ResourceNotFoundException, collectors, com.fasterxml.jackson.annotation.JsonInclude, fielderror, httpstatus, linkedhashmap (+9 more)

### Community 8 - "Ticket"
Cohesion: 0.06
Nodes (32): Comment, Ticket, CommentResponse, TicketDetailResponse, TicketListResponse, TicketResponse, TicketMapper, CommentRepository (+24 more)

### Community 9 - "UI Flow"
Cohesion: 0.06
Nodes (30): 1. Screens (MVP), 2. Global UI behavior, 3.1 Ticket List, 3.2 Create Ticket, 3.3 Ticket Detail, 3. Screen flows, 4. End-to-end user journeys, 5. Screen → API map (+22 more)

### Community 10 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 13 - "TicketStatus"
Cohesion: 0.08
Nodes (26): assertequals, assertfalse, assertthrows, asserttrue, TicketStatus, CANCELLED, CLOSED, IN_PROGRESS (+18 more)

### Community 15 - "TicketPriority"
Cohesion: 0.11
Nodes (17): TicketPriority, HIGH, LOW, MEDIUM, CreateCommentRequest, CreateTicketRequest, UpdateTicketRequest, notblank (+9 more)

### Community 20 - "Documentation Skills"
Cohesion: 0.40
Nodes (4): Agent behavior, Documentation Skills, How to document, What to document

### Community 21 - "Architecture (Detailed)"
Cohesion: 0.22
Nodes (8): 1.1 Architecture goals (MVP), 1.2 Non-goals (MVP), 1. Goals and non-goals, 2.1 Actors, 2.2 Context diagram, 2. System context, Architecture (Detailed), Purpose of this document

### Community 22 - "Data Model"
Cohesion: 0.07
Nodes (27): 10. ER diagram, 11. Persistence notes, 12. Out of model for MVP, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations (+19 more)

### Community 23 - "3. Functional requirements"
Cohesion: 0.08
Nodes (24): 1. Purpose, 2. Scope, 3.10 Backend validation, 3.11 UI error display, 3.1 Create ticket, 3.2 List tickets, 3.3 View ticket details, 3.4 Update ticket fields (+16 more)

### Community 24 - "State Machine"
Cohesion: 0.11
Nodes (17): 1. Statuses, 2. Allowed transitions, 3. Transition matrix, 4. Invalid transitions (must be rejected), 5. Enforcement rules, 6. Allowed next statuses (helper view), 7. Persistence behavior, 8. Out of scope for MVP state machine (+9 more)

### Community 25 - "Test Strategy"
Cohesion: 0.09
Nodes (22): 10. Out of scope for MVP testing, 1. Goals, 2. Test levels, 3.1 State transition policy, 3.2 Ticket service (optional but recommended), 3. Backend unit tests, 4.1 Ticket CRUD / fields, 4.2 Comments (+14 more)

## Knowledge Gaps
- **304 isolated node(s):** `LOW`, `MEDIUM`, `HIGH`, `OPEN`, `IN_PROGRESS` (+299 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 349 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TicketStatus` connect `TicketStatus` to `3. Endpoints`, `Data Model`, `Ticket`, `TicketPriority`, `Data Model`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `5. Out of scope for MVP API` connect `5. Out of scope for MVP API` to `Ticket`, `2026-09-22 19:37:04Z`, `API Contract`, `TicketPriority`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `API Contract` connect `API Contract` to `3.2 List tickets (search + filter)`, `5. Out of scope for MVP API`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `TicketStatus` (e.g. with `4.2 Field rules` and `Status change`) actually correct?**
  _`TicketStatus` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Ticket` (e.g. with `2. Design choices (MVP)` and `6.1 Ticket → Comment (one-to-many)`) actually correct?**
  _`Ticket` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Comment` (e.g. with `2. Design choices (MVP)` and `6.1 Ticket → Comment (one-to-many)`) actually correct?**
  _`Comment` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `LOW`, `MEDIUM`, `HIGH` to the rest of the system?**
  _304 weakly-connected nodes found - possible documentation gaps or missing edges._