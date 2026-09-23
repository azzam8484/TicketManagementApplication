# Graph Report - TicketManagementApplication  (2026-09-23)

## Corpus Check
- 84 files · ~52,097 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 36 file(s) not represented in the graph (top: .css 16, (none) 6, .mdc 5)

## Summary
- 890 nodes · 1387 edges · 47 communities (37 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `470dcacb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- API Contract
- 3.2 List tickets (search + filter)
- Data Model
- 2026-09-22 19:37:04Z
- 3.2 List tickets (search + filter)
- TicketApiIntegrationTest
- 5. Out of scope for MVP API
- GlobalExceptionHandler.java
- TicketService
- UI Flow
- gradlew
- TicketStatus
- Ticket
- TicketDetailPage.tsx
- 2026-09-22_19-37-04Z-hi-is-the-spec.md
- Documentation Skills
- Architecture (Detailed)
- Data Model
- 3. Functional requirements
- State Machine
- Test Strategy
- CorsConfig.java
- StatusControl.tsx
- package.json
- compilerOptions
- TicketListPage.tsx
- common/index.ts
- README.md
- API Contract
- Comment
- frontend_src_components_tickets_ticketdetailplaceholder_module
- AppShell.tsx
- Comment.java
- ticket.ts
- TicketController.java
- frontend_src_app_tickets_page_module
- CreateCommentRequest
- TicketService.java
- Frontend MVP — manual acceptance checklist (F8)
- frontend_src_components_tickets_createticketpage_module
- frontend_src_components_tickets_ticketdetailpage_module
- CommentsSection.tsx

## God Nodes (most connected - your core abstractions)
1. `5. Out of scope for MVP API` - 55 edges
2. `TicketStatus` - 38 edges
3. `Ticket` - 35 edges
4. `TicketApiIntegrationTest` - 30 edges
5. `2026-09-22 19:37:04Z` - 23 edges
6. `TicketService` - 21 edges
7. `Comment` - 20 edges
8. `TicketResponse` - 18 edges
9. `compilerOptions` - 16 edges
10. `TicketPriority` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Responses` --references--> `CommentResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/CommentResponse.java
- `Responses` --references--> `TicketDetailResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketDetailResponse.java
- `Responses` --references--> `TicketResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketResponse.java
- `Responses` --references--> `TicketResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketResponse.java
- `Responses` --references--> `TicketResponse`  [INFERRED]
  .specstory/history/2026-09-22_19-37-04Z-spec-story-configuration-status.md → backend/src/main/java/com/ticketmanagement/dto/TicketResponse.java

## Import Cycles
- None detected.

## Communities (47 total, 10 thin omitted)

### Community 0 - "API Contract"
Cohesion: 0.05
Nodes (40): 1. General conventions, 1. Overview, 2. Shared schemas, 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status (+32 more)

### Community 1 - "3.2 List tickets (search + filter)"
Cohesion: 0.05
Nodes (40): 1. General conventions, 2. API list, 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment (+32 more)

### Community 2 - "Data Model"
Cohesion: 0.06
Nodes (34): 10. Out of model for MVP, 11. ER diagram, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations, 4.1 Fields (+26 more)

### Community 3 - "2026-09-22 19:37:04Z"
Cohesion: 0.05
Nodes (39): TicketManagementApplication, org.springframework.boot.autoconfigure.SpringBootApplication, 1. `.cursor/commands/review-code.md`, 1. `.cursor/rules/java-springboot.mdc`, 2026-09-22 19:37:04Z, 2. `.cursor/commands/review-spec.md`, 2. `.cursor/rules/testing.mdc`, 3. `.cursor/commands/generate-tests.md` (+31 more)

### Community 4 - "3.2 List tickets (search + filter)"
Cohesion: 0.06
Nodes (33): 3.1 Create ticket, 3.2 List tickets (search + filter), 3.3 Get ticket details, 3.4 Update ticket fields, 3.5 Change ticket status, 3.6 Add comment, 3. Endpoints with dummy responses, Dummy error response — `400 Bad Request` (+25 more)

### Community 5 - "TicketApiIntegrationTest"
Cohesion: 0.10
Nodes (20): autowired, TicketApiIntegrationTest, com.fasterxml.jackson.databind.ObjectMapper, containsstring, get, hassize, header, is (+12 more)

### Community 6 - "5. Out of scope for MVP API"
Cohesion: 0.04
Nodes (53): 5. Out of scope for MVP API, Build order (from your architecture / MVP), Change, Commit these (Part 1), Constraints we’ll keep, Do **not** commit, Flow locally, How data *can* survive restart (+45 more)

### Community 7 - "GlobalExceptionHandler.java"
Cohesion: 0.14
Nodes (18): ErrorResponse, GlobalExceptionHandler, ValidationException, collections, collectors, com.fasterxml.jackson.annotation.JsonInclude, fielderror, httpstatus (+10 more)

### Community 8 - "TicketService"
Cohesion: 0.24
Nodes (7): ChangeStatusRequest, CreateTicketRequest, TicketResponse, UpdateTicketRequest, TicketService, org.springframework.stereotype.Service, org.springframework.web.bind.annotation.PatchMapping

### Community 9 - "UI Flow"
Cohesion: 0.06
Nodes (30): 1. Screens (MVP), 2. Global UI behavior, 3.1 Ticket List, 3.2 Create Ticket, 3.3 Ticket Detail, 3. Screen flows, 4. End-to-end user journeys, 5. Screen → API map (+22 more)

### Community 10 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 13 - "TicketStatus"
Cohesion: 0.09
Nodes (22): assertequals, assertfalse, assertthrows, asserttrue, TicketStatus, CANCELLED, CLOSED, IN_PROGRESS (+14 more)

### Community 14 - "Ticket"
Cohesion: 0.10
Nodes (6): Ticket, TicketPriority, HIGH, LOW, MEDIUM, jakarta.persistence.PreUpdate

### Community 15 - "TicketDetailPage.tsx"
Cohesion: 0.16
Nodes (21): TicketDetailRouteProps, formatTimestamp(), FormState, TicketDetailPage(), cancelEdit(), handleAddComment(), handleReset(), handleSave() (+13 more)

### Community 20 - "Documentation Skills"
Cohesion: 0.40
Nodes (4): Agent behavior, Documentation Skills, How to document, What to document

### Community 21 - "Architecture (Detailed)"
Cohesion: 0.22
Nodes (8): 1.1 Architecture goals (MVP), 1.2 Non-goals (MVP), 1. Goals and non-goals, 2.1 Actors, 2.2 Context diagram, 2. System context, Architecture (Detailed), Purpose of this document

### Community 22 - "Data Model"
Cohesion: 0.06
Nodes (33): 10. ER diagram, 11. Persistence notes, 12. Out of model for MVP, 1. Overview, 2. Design choices (MVP), 3.1 TicketStatus, 3.2 TicketPriority, 3. Enumerations (+25 more)

### Community 23 - "3. Functional requirements"
Cohesion: 0.08
Nodes (24): 1. Purpose, 2. Scope, 3.10 Backend validation, 3.11 UI error display, 3.1 Create ticket, 3.2 List tickets, 3.3 View ticket details, 3.4 Update ticket fields (+16 more)

### Community 24 - "State Machine"
Cohesion: 0.11
Nodes (17): 1. Statuses, 2. Allowed transitions, 3. Transition matrix, 4. Invalid transitions (must be rejected), 5. Enforcement rules, 6. Allowed next statuses (helper view), 7. Persistence behavior, 8. Out of scope for MVP state machine (+9 more)

### Community 25 - "Test Strategy"
Cohesion: 0.09
Nodes (22): 10. Out of scope for MVP testing, 1. Goals, 2. Test levels, 3.1 State transition policy, 3.2 Ticket service (optional but recommended), 3. Backend unit tests, 4.1 Ticket CRUD / fields, 4.2 Comments (+14 more)

### Community 26 - "CorsConfig.java"
Cohesion: 0.27
Nodes (8): arrays, CorsConfig, corsconfiguration, org.springframework.context.annotation.Bean, org.springframework.context.annotation.Configuration, org.springframework.web.filter.CorsFilter, urlbasedcorsconfigurationsource, value

### Community 27 - "StatusControl.tsx"
Cohesion: 0.14
Nodes (17): formatStatusLabel(), frontend_src_components_common_statusbadge_module, STATUS_CLASS, StatusBadge(), StatusBadgeProps, frontend_src_components_tickets_statuscontrol_module, StatusControl(), StatusControlProps (+9 more)

### Community 28 - "package.json"
Cohesion: 0.06
Nodes (34): compat, __dirname, eslintConfig, __filename, dependencies, next, react, react-dom (+26 more)

### Community 29 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 30 - "TicketListPage.tsx"
Cohesion: 0.15
Nodes (14): LoadingState(), LoadingStateProps, frontend_src_components_common_loadingstate_module, InProgressTicketsIcon(), OpenTicketsIcon(), ResolvedTicketsIcon(), StatIconProps, TotalTicketsIcon() (+6 more)

### Community 31 - "common/index.ts"
Cohesion: 0.16
Nodes (14): EmptyState(), EmptyStateProps, frontend_src_components_common_emptystate_module, ErrorBanner(), ErrorBannerProps, frontend_src_components_common_errorbanner_module, resolveErrorFields(), resolveErrorMessage() (+6 more)

### Community 32 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 33 - "API Contract"
Cohesion: 0.33
Nodes (6): 1. General conventions, 2. API list, 4. Dummy data reference (shared sample IDs), API Contract, Error response shape, Purpose of this document

### Community 34 - "Comment"
Cohesion: 0.13
Nodes (7): Comment, CommentRepository, TicketRepository, org.springframework.data.jpa.repository.JpaRepository, org.springframework.data.jpa.repository.Query, param, Backend parts (in order)

### Community 36 - "AppShell.tsx"
Cohesion: 0.09
Nodes (18): nextConfig, frontend_src_app_globals, bodyFont, displayFont, metadata, AppShell(), AppShellProps, countByStatus() (+10 more)

### Community 37 - "Comment.java"
Cohesion: 0.15
Nodes (14): column, enumerated, enumtype, fetchtype, generatedvalue, generationtype, id, instant (+6 more)

### Community 38 - "ticket.ts"
Cohesion: 0.11
Nodes (21): formatPriorityLabel(), PRIORITY_LABELS, STATUS_LABELS, frontend_src_components_common_prioritybadge_module, PRIORITY_CLASS, PriorityBadge(), PriorityBadgeProps, CreateTicketPage() (+13 more)

### Community 39 - "TicketController.java"
Cohesion: 0.14
Nodes (13): TicketController, TicketListResponse, org.springframework.web.bind.annotation.GetMapping, org.springframework.web.bind.annotation.PostMapping, org.springframework.web.bind.annotation.RequestMapping, org.springframework.web.bind.annotation.ResponseStatus, org.springframework.web.bind.annotation.RestController, pathvariable (+5 more)

### Community 42 - "CreateCommentRequest"
Cohesion: 0.29
Nodes (4): CreateCommentRequest, notblank, notnull, size

### Community 43 - "TicketService.java"
Cohesion: 0.22
Nodes (6): CommentResponse, TicketDetailResponse, ResourceNotFoundException, TicketMapper, list, org.springframework.transaction.annotation.Transactional

### Community 44 - "Frontend MVP — manual acceptance checklist (F8)"
Cohesion: 0.22
Nodes (8): Create ticket (`/tickets/new`), Errors / durability (cross-check), Frontend MVP — manual acceptance checklist (F8), Screens / navigation, Spec mapping, Status + comments, Ticket detail (`/tickets/{id}`), Ticket list (`/tickets`)

### Community 47 - "CommentsSection.tsx"
Cohesion: 0.18
Nodes (6): CommentsSection(), CommentsSectionProps, formatTimestamp(), frontend_src_components_comments_commentssection_module, ApiError, Comment

## Knowledge Gaps
- **397 isolated node(s):** `LOW`, `MEDIUM`, `HIGH`, `OPEN`, `IN_PROGRESS` (+392 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 507 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `5. Out of scope for MVP API` connect `5. Out of scope for MVP API` to `API Contract`, `Comment`, `2026-09-22 19:37:04Z`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `Backend parts (in order)` connect `Comment` to `5. Out of scope for MVP API`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `API Contract` connect `API Contract` to `API Contract`, `3.2 List tickets (search + filter)`, `5. Out of scope for MVP API`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `LOW`, `MEDIUM`, `HIGH` to the rest of the system?**
  _397 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API Contract` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `3.2 List tickets (search + filter)` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `Data Model` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._