# Graph Report - frontend  (2026-09-23)

## Corpus Check
- 36 files · ~5,729 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 16, (none) 3, .example 1)

## Summary
- 217 nodes · 400 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d2b64ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- TicketListPage.tsx
- common/index.ts
- api/index.ts
- CreateTicketPage.tsx
- compilerOptions
- TicketDetailPage.tsx
- next
- ticket.ts
- CommentsSection.tsx
- Frontend MVP — manual acceptance checklist (F8)
- README.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `TicketDetailPage()` - 13 edges
3. `next` - 12 edges
4. `formatStatusLabel()` - 12 edges
5. `ApiError` - 12 edges
6. `apiRequest()` - 10 edges
7. `TicketStatus` - 10 edges
8. `react` - 9 edges
9. `ErrorBanner()` - 9 edges
10. `formatPriorityLabel()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AppShell()` --calls--> `formatStatusLabel()`  [EXTRACTED]
  src/components/AppShell.tsx → src/components/common/labels.ts
- `TicketListControls()` --calls--> `formatStatusLabel()`  [EXTRACTED]
  src/components/tickets/TicketListControls.tsx → src/components/common/labels.ts
- `TicketListPage()` --calls--> `formatStatusLabel()`  [EXTRACTED]
  src/components/tickets/TicketListPage.tsx → src/components/common/labels.ts
- `TicketDetailPage()` --calls--> `formatPriorityLabel()`  [EXTRACTED]
  src/components/tickets/TicketDetailPage.tsx → src/components/common/labels.ts
- `CreateTicketPage()` --calls--> `createTicket()`  [EXTRACTED]
  src/components/tickets/CreateTicketPage.tsx → src/lib/api/tickets.ts

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (34): compat, __dirname, eslintConfig, __filename, dependencies, next, react, react-dom (+26 more)

### Community 1 - "TicketListPage.tsx"
Cohesion: 0.10
Nodes (19): react, src_app_globals, bodyFont, displayFont, metadata, AppShell(), AppShellProps, countByStatus() (+11 more)

### Community 2 - "common/index.ts"
Cohesion: 0.12
Nodes (20): EmptyState(), EmptyStateProps, src_components_common_emptystate_module, formatStatusLabel(), src_components_common_statusbadge_module, STATUS_CLASS, StatusBadge(), StatusBadgeProps (+12 more)

### Community 3 - "api/index.ts"
Cohesion: 0.16
Nodes (13): ErrorBanner(), ErrorBannerProps, src_components_common_errorbanner_module, resolveErrorFields(), resolveErrorMessage(), apiRequest(), RequestOptions, ApiError (+5 more)

### Community 4 - "CreateTicketPage.tsx"
Cohesion: 0.14
Nodes (15): formatPriorityLabel(), PRIORITY_LABELS, STATUS_LABELS, src_components_common_prioritybadge_module, PRIORITY_CLASS, PriorityBadge(), PriorityBadgeProps, clientValidate() (+7 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "TicketDetailPage.tsx"
Cohesion: 0.18
Nodes (14): TicketDetailRouteProps, clientValidate(), formatTimestamp(), FormState, src_components_tickets_ticketdetailpage_module, TicketDetailPage(), handleAddComment(), handleReset() (+6 more)

### Community 7 - "next"
Cohesion: 0.18
Nodes (7): nextConfig, next, formatRelative(), initials(), src_components_tickets_ticketlisttable_module, TicketListTable(), TicketListTableProps

### Community 8 - "ticket.ts"
Cohesion: 0.30
Nodes (10): ApiErrorBody, ChangeStatusRequest, Comment, CreateCommentRequest, CreateTicketRequest, ListTicketsParams, Ticket, TicketDetail (+2 more)

### Community 9 - "CommentsSection.tsx"
Cohesion: 0.22
Nodes (7): CommentsSection(), CommentsSectionProps, formatTimestamp(), src_components_comments_commentssection_module, FieldErrors(), FieldErrorsProps, src_components_common_fielderrors_module

### Community 10 - "Frontend MVP — manual acceptance checklist (F8)"
Cohesion: 0.22
Nodes (8): Create ticket (`/tickets/new`), Errors / durability (cross-check), Frontend MVP — manual acceptance checklist (F8), Screens / navigation, Spec mapping, Status + comments, Ticket detail (`/tickets/{id}`), Ticket list (`/tickets`)

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **84 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `nextConfig` (+79 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 115 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `TicketListPage.tsx`, `common/index.ts`, `api/index.ts`, `CreateTicketPage.tsx`, `TicketDetailPage.tsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `react` connect `TicketListPage.tsx` to `package.json`, `common/index.ts`, `CreateTicketPage.tsx`, `TicketDetailPage.tsx`, `CommentsSection.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _84 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `TicketListPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Should `common/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11965811965811966 - nodes in this community are weakly interconnected._
- **Should `CreateTicketPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._