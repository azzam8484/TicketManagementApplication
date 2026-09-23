# Graph Report - TicketManagementApplication  (2026-09-23)

## Corpus Check
- 15 files · ~28,419 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: .mdc 5, (none) 2, .toml 1)

## Summary
- 318 nodes · 305 edges · 24 communities (17 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 3. Endpoints
- 3. Endpoints with dummy responses
- Data Model
- 2026-09-22 19:37:04Z
- 3. Endpoints with dummy responses
- API Contract
- 5. Out of scope for MVP API
- Final requirements (for `.md`)
- API Contract
- 3.1 Ticket List
- 3.2 List tickets (search + filter)
- 5. Entity: Comment
- 3.2 List tickets (search + filter)
- 2026-09-22_19-37-04Z-hi-is-the-spec.md
- Data Model
- State Machine
- Test Strategy
- UI Flow

## God Nodes (most connected - your core abstractions)
1. `2026-09-22 19:37:04Z` - 22 edges
2. `5. Out of scope for MVP API` - 15 edges
3. `Data Model` - 13 edges
4. `Data Model` - 13 edges
5. `Test Strategy` - 12 edges
6. `State Machine` - 10 edges
7. `Final requirements (for `.md`)` - 9 edges
8. `API Contract` - 8 edges
9. `UI Flow` - 8 edges
10. `5. Entity: Comment` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (24 total, 7 thin omitted)

### Community 0 - "3. Endpoints"
Cohesion: 0.08
Nodes (24): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints, Example (+16 more)

### Community 1 - "3. Endpoints with dummy responses"
Cohesion: 0.08
Nodes (26): 3.1 Create ticket, 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request`, Dummy error response — `400 Bad Request` (+18 more)

### Community 2 - "Data Model"
Cohesion: 0.06
Nodes (34): 10. Out of model for MVP, 11. ER diagram, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+26 more)

### Community 3 - "2026-09-22 19:37:04Z"
Cohesion: 0.08
Nodes (26): 1. `.cursor/commands/review-code.md`, 1. `.cursor/rules/java-springboot.mdc`, 2026-09-22 19:37:04Z, 2. `.cursor/commands/review-spec.md`, 2. `.cursor/rules/testing.mdc`, 3. `.cursor/commands/generate-tests.md`, 3. `.cursor/rules/api-standards.mdc`, 4. `.cursor/rules/documentation.mdc` (+18 more)

### Community 4 - "3. Endpoints with dummy responses"
Cohesion: 0.08
Nodes (26): 3.1 Create ticket, 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request`, Dummy error response — `400 Bad Request` (+18 more)

### Community 5 - "API Contract"
Cohesion: 0.12
Nodes (16): 1. General conventions, 1. Overview, 2. Shared schemas, 4. Endpoint map (summary), 5. Frontend usage mapping, 6. Out of scope for MVP API, API Contract, CommentResponse (+8 more)

### Community 6 - "5. Out of scope for MVP API"
Cohesion: 0.10
Nodes (21): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Error response shape, How it connects to other specs, How the app uses this (+13 more)

### Community 7 - "Final requirements (for `.md`)"
Cohesion: 0.22
Nodes (9): Already drafted, Cross-reference rule, Document ownership (what each file is for), Example from your architecture, Final requirements (for `.md`), Goals vs non-goals, How this differs from the short version, Summary of what was added from acceptance criteria (+1 more)

### Community 8 - "API Contract"
Cohesion: 0.25
Nodes (7): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Error response shape, Purpose of this document

### Community 9 - "3.1 Ticket List"
Cohesion: 0.12
Nodes (16): 3.1 Ticket List, 3.2 Create Ticket, 3.3 Ticket Detail, 3. Screen flows, Empty / error states, Flow diagram, Flow diagram, Flow diagram (+8 more)

### Community 10 - "3.2 List tickets (search + filter)"
Cohesion: 0.29
Nodes (7): 3.2 List tickets (search + filter), Dummy error response — `400 Bad Request` (invalid status filter), Dummy request (all tickets), Dummy request (search + filter), Dummy success response — `200 OK`, Dummy success response — empty list — `200 OK`, Query parameters

### Community 11 - "5. Entity: Comment"
Cohesion: 0.29
Nodes (7): 5.1 Fields, 5.2 Field rules, 5.3 Comment constraints, 5.4 Referential action, 5.5 Indexes (Comment), 5.6 Table definition (logical SQL), 5. Entity: Comment

### Community 12 - "3.2 List tickets (search + filter)"
Cohesion: 0.29
Nodes (7): 3.2 List tickets (search + filter), Dummy error response — `400 Bad Request` (invalid status filter), Dummy request (all tickets), Dummy request (search + filter), Dummy success response — `200 OK`, Dummy success response — empty list — `200 OK`, Query parameters

### Community 22 - "Data Model"
Cohesion: 0.08
Nodes (25): 10. ER diagram, 11. Out of model for MVP, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+17 more)

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
- **242 isolated node(s):** `2026-09-22 19:37:04Z`, `What SpecStory is for`, `How to use it day to day`, `Why history looks so noisy`, `If you want less clutter` (+237 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 254 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `API Contract` connect `5. Out of scope for MVP API` to `3. Endpoints with dummy responses`, `API Contract`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `API Contract` connect `API Contract` to `3. Endpoints`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `2026-09-22 19:37:04Z` connect `2026-09-22 19:37:04Z` to `API Contract`, `Final requirements (for `.md`)`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `2026-09-22 19:37:04Z`, `What SpecStory is for`, `How to use it day to day` to the rest of the system?**
  _242 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `3. Endpoints` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `3. Endpoints with dummy responses` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Data Model` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._