# Graph Report - TicketManagementApplication  (2026-09-23)

## Corpus Check
- 19 files · ~30,935 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: (none) 12, .mdc 5, .properties 2)

## Summary
- 334 nodes · 321 edges · 24 communities (15 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- 3. Endpoints
- 3.2 List tickets (search + filter)
- Data Model
- 2026-09-22 19:37:04Z
- 3.2 List tickets (search + filter)
- API Contract
- 5. Out of scope for MVP API
- Final requirements (for `.md`)
- API Contract
- 3.1 Ticket List
- gradlew
- 2026-09-22_19-37-04Z-hi-is-the-spec.md
- Data Model
- State Machine
- Test Strategy
- UI Flow

## God Nodes (most connected - your core abstractions)
1. `2026-09-22 19:37:04Z` - 23 edges
2. `5. Out of scope for MVP API` - 20 edges
3. `Data Model` - 13 edges
4. `Data Model` - 13 edges
5. `Test Strategy` - 12 edges
6. `State Machine` - 10 edges
7. `Final requirements (for `.md`)` - 9 edges
8. `API Contract` - 8 edges
9. `UI Flow` - 8 edges
10. `5. Entity: Comment` - 7 edges

## Surprising Connections (you probably didn't know these)
- `2026-09-22 19:37:04Z` --references--> `TicketManagementApplication`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/TicketManagementApplication.java

## Import Cycles
- None detected.

## Communities (24 total, 9 thin omitted)

### Community 0 - "3. Endpoints"
Cohesion: 0.08
Nodes (24): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints, Example (+16 more)

### Community 1 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 2 - "Data Model"
Cohesion: 0.06
Nodes (34): 10. Out of model for MVP, 11. ER diagram, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+26 more)

### Community 3 - "2026-09-22 19:37:04Z"
Cohesion: 0.07
Nodes (29): TicketManagementApplication, org.springframework.boot.autoconfigure.SpringBootApplication, 1. `.cursor/commands/review-code.md`, 1. `.cursor/rules/java-springboot.mdc`, 2026-09-22 19:37:04Z, 2. `.cursor/commands/review-spec.md`, 2. `.cursor/rules/testing.mdc`, 3. `.cursor/commands/generate-tests.md` (+21 more)

### Community 4 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 5 - "API Contract"
Cohesion: 0.12
Nodes (16): 1. General conventions, 1. Overview, 2. Shared schemas, 4. Endpoint map (summary), 5. Frontend usage mapping, 6. Out of scope for MVP API, API Contract, CommentResponse (+8 more)

### Community 6 - "5. Out of scope for MVP API"
Cohesion: 0.08
Nodes (26): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Backend parts (in order), Build order (from your architecture / MVP), Constraints we’ll keep (+18 more)

### Community 7 - "Final requirements (for `.md`)"
Cohesion: 0.22
Nodes (9): Already drafted, Cross-reference rule, Document ownership (what each file is for), Example from your architecture, Final requirements (for `.md`), Goals vs non-goals, How this differs from the short version, Summary of what was added from acceptance criteria (+1 more)

### Community 8 - "API Contract"
Cohesion: 0.25
Nodes (7): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), 5. Out of scope for MVP API, API Contract, Error response shape, Purpose of this document

### Community 9 - "3.1 Ticket List"
Cohesion: 0.12
Nodes (16): 3.1 Ticket List, 3.2 Create Ticket, 3.3 Ticket Detail, 3. Screen flows, Empty / error states, Flow diagram, Flow diagram, Flow diagram (+8 more)

### Community 10 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 22 - "Data Model"
Cohesion: 0.06
Nodes (32): 10. ER diagram, 11. Out of model for MVP, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+24 more)

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
- **247 isolated node(s):** `2026-09-22 19:37:04Z`, `What SpecStory is for`, `How to use it day to day`, `Why history looks so noisy`, `If you want less clutter` (+242 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 263 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `API Contract` connect `5. Out of scope for MVP API` to `3.2 List tickets (search + filter)`, `API Contract`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `2026-09-22 19:37:04Z` connect `2026-09-22 19:37:04Z` to `API Contract`, `Final requirements (for `.md`)`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `API Contract` connect `API Contract` to `3. Endpoints`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `2026-09-22 19:37:04Z`, `What SpecStory is for`, `How to use it day to day` to the rest of the system?**
  _247 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `3. Endpoints` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `3.2 List tickets (search + filter)` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Data Model` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._