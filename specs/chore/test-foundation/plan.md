# Chore: Test foundation

## Metadata

prompt: `Scope places in the current web and CRM work that make sense for unit and component tests.`

## Chore Description

Add a small, behavior-focused test foundation for the CRM API, shared contracts, and web event workflow. Tests should target business and integration boundaries, not generated OpenAPI client files or generic visual primitives.

## Relevant Files

### Shared contracts

- `packages/contracts/src/events.ts` - Event, attendance, and response schemas.
- `packages/contracts/src/ghosts.ts` - Ghost response schema.
- `packages/contracts/src/venues.ts` - Venue schema.

### CRM

- `services/crm/src/events.ts` - Demo event projection and lookup behavior.
- `services/crm/src/app.ts` - Testable Express application assembly.
- `services/crm/src/openapi/document.ts` - Generated OpenAPI document definition.
- `services/crm/src/routers/events.ts` - Event endpoint behavior.
- `services/crm/src/routers/health.ts` - Health endpoint behavior.
- `services/crm/src/routers/openapi.ts` - OpenAPI endpoint behavior.

### Web

- `apps/web/src/utilities/events.ts` - Pure date and time formatting helpers.
- `apps/web/src/hooks/use-events.ts` - Domain hooks that hide TanStack Query and generated-client details.
- `apps/web/src/components/events/EventStatusBadge.tsx` - Status rendering behavior.
- `apps/web/src/components/events/EventInfoCard.tsx` - Event metadata rendering behavior.
- `apps/web/src/components/events/EventRoster.tsx` - Attendance and correction interaction behavior.
- `apps/web/src/pages/EventsPage.tsx` - List loading, error, and rendered event states.
- `apps/web/src/pages/EventDetailPage.tsx` - Detail loading, missing-event, and composed event states.

## Step by Step Tasks

### 1. Add test tooling per workspace

- Add Vitest to `packages/contracts`, `services/crm`, and `apps/web` with package-local test scripts.
- Configure the contracts and CRM suites for the Node environment.
- Configure the web suite for jsdom with React Testing Library, user-event, and jest-dom matchers.
- Add Supertest to the CRM test dependencies for in-memory Express application tests.
- Add shared test setup files only where a workspace needs them.
- Use Vitest's V8 coverage provider with an initial global threshold of 80% for lines, statements, and functions, plus 70% for branches.
- Include only authored test-target source paths in coverage and exclude generated OpenAPI client files, application entry points, static fixture data, and generic UI primitives.

### 2. Cover shared contract validation

- Add contract tests for valid event summaries and details, including ISO timestamps with UTC offsets.
- Add negative tests for invalid status, attendance, and malformed event response data.
- Keep schema tests focused on validation rules that affect API compatibility.

### 3. Cover CRM units and HTTP behavior

- Add unit tests for `listDemoEvents` to verify roster data is omitted from summaries.
- Add unit tests for `getDemoEvent` to verify known and missing identifier behavior.
- Add application tests created from `createApp()` for health, event list, event detail, missing event, and OpenAPI responses.
- Assert stable response fields and status codes instead of snapshotting complete payloads.
- Assert the OpenAPI document advertises the published event and health paths and the expected version.

### 4. Cover pure web utilities and hooks

- Add deterministic tests for `formatEventDate`, `formatEventTimeRange`, and `formatEventWindow`; set an explicit timezone for the suite or make the formatter timezone explicit.
- Add hook tests for `useEvents` and `useEvent` with an isolated QueryClient per test.
- Use MSW from the first web test suite to intercept real fetch requests and verify loading, successful response, error response, and missing event identifier behavior.
- Do not test generated client implementation files directly; generated output is covered through the hooks that consume it.

### 5. Cover event components and pages

- Add component tests for `EventStatusBadge` and `EventInfoCard` using representative event props.
- Add `EventRoster` tests for initial roster rendering, recording attendance with an optional note, and requiring a reason before correcting an existing attendance record.
- Add page tests for event-list loading, error, and populated states, plus event-detail loading and missing-event redirects.
- Prefer accessible queries by role, label, and visible text over implementation-specific selectors.

### 6. Extract pure attendance transitions if interaction tests become repetitive

- Move roster mapping and attendance-correction transition logic from `EventRoster` into a dedicated utility only if the component tests need repeated state setup or transition edge cases.
- Add direct unit tests for the extracted utility before adding more component assertions.
- Keep styling and component composition inside `EventRoster`.

## Tasks

| Done | Task                                                          | Blocked By |
| ---- | ------------------------------------------------------------- | ---------- |
| [x]  | 1. Add test tooling per workspace                             | -          |
| [x]  | 2. Cover shared contract validation                           | 1          |
| [x]  | 3. Cover CRM units and HTTP behavior                          | 1          |
| [x]  | 4. Cover pure web utilities and hooks                         | 1          |
| [x]  | 5. Cover event components and pages                           | 1, 4       |
| [x]  | 6. Extract pure attendance transitions if needed (not needed) | 5          |

## Validation Commands

- `pnpm --filter @ghost-crm/contracts test`
- `pnpm --filter @ghost-crm/crm test`
- `pnpm --filter web test`
- `pnpm --filter @ghost-crm/contracts build`
- `pnpm --filter @ghost-crm/crm build`
- `pnpm --filter web build`
- `pnpm format:check`

## Documentation Updates

- Update `README.md` with the workspace test commands once the scripts and test runner configuration are added.
- Do not document generated-client internals; document the supported domain hooks and API contract generation workflow instead.

## Open Questions

- [x] Enforce an initial coverage threshold of 80% for lines, statements, and functions, plus 70% for branches.
- [x] Use MSW from the first web test suite rather than mocking generated client functions directly.

## Notes

- Do not add tests for generated OpenAPI client files, shadcn-style UI primitives, or static mock data unless they acquire application-specific behavior.
- The current split between `createApp()`, domain hooks, utilities, and event components is intentionally suitable for this test scope.
