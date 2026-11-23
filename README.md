# Ghost CRM

Ghost CRM is a multi-tenant CRM for haunted attractions, Halloween events, paranormal tours, and ghost-hunting communities. It helps organizers manage ghost profiles, venues, events, sightings, and campaign outreach without losing the playful character of the domain.

> A systems-design portfolio project about building trustworthy operational software for the afterlife.

## The problem

Halloween-event organizers often coordinate recurring characters, venue details, event schedules, investigation notes, and outreach through spreadsheets and disconnected tools. Ghost CRM treats ghosts as the core relationship records and gives each organization a secure, searchable operating system for its paranormal events.

An organizer should be able to answer questions such as:

- Which ghosts are assigned to next weekend's haunted tour?
- Which active ghosts have not been sighted recently?
- What happened during a prior investigation?
- Who changed a ghost's threat level or event assignment?
- Did every selected ghost receive an invitation to the next séance?

## Product scope

### Core workflows

- Create, search, filter, edit, and archive ghost profiles.
- Manage venues and schedule events such as investigations, haunted tours, séances, and parties.
- Assign ghosts to events and surface scheduling conflicts.
- Record sightings with notes, confidence, attachments, and a reporting team member.
- Display an activity timeline for meaningful changes.
- Build ghost segments and run reliable invitation campaigns.

### Users

| Role                       | Responsibilities                                          |
| -------------------------- | --------------------------------------------------------- |
| Organization administrator | Manages members, roles, settings, and venues.             |
| Event coordinator          | Plans events, assigns ghosts, and runs campaigns.         |
| Investigator or volunteer  | Records sightings and operational notes.                  |
| Read-only collaborator     | Reviews histories and event details without editing data. |

## Design principles

- **Multi-tenant by default:** every request is scoped to an organization and organization boundaries are enforced server-side.
- **Auditability:** important changes are attributable, timestamped, and visible in an activity timeline.
- **Reliable operations:** retries and asynchronous work must not create duplicate invitations or duplicate business actions.
- **Progressive complexity:** begin with a cohesive relational application, then introduce specialized infrastructure only when a real access pattern justifies it.
- **Playful, not frivolous:** the visual product can be fun while the data model, security, and operational behavior remain credible.

## Planned architecture

The initial design will use a relational system of record because ghosts, organizations, venues, events, users, and activity records have strongly connected data and require reliable transactions.

```text
Web application
    │
    ▼
API and authorization layer
    │
    ▼
Relational database
    ├── Activity and audit records
    ├── Background jobs and outbox records
    └── Tenant-scoped application data

Future capabilities when justified:
    ├── Object storage for evidence uploads
    ├── Queue and workers for campaigns
    ├── Cache for repeated reads and rate limits
    └── Search index for full-text discovery
```

The project will document the conditions that justify each architectural evolution, including scale, query patterns, reliability requirements, and operational cost.

## Systems-design questions

Ghost CRM is intentionally designed to make these engineering decisions visible:

- How should tenant context be derived and enforced in every query and job?
- Which changes require one transaction, and which should be published asynchronously?
- How should campaign delivery be idempotent and observable?
- How should the application preserve an audit history without making common reads slow?
- When do search, caching, object storage, and a queue become necessary?
- Which metrics reveal slow requests, stuck jobs, delivery failures, and authorization problems?

## Roadmap

### Phase 1 — Operational foundation

- Organization-scoped authentication and roles.
- Ghost, venue, event, and sighting management.
- Activity timeline and basic search/filtering.
- Validation, permissions, loading states, and audit records.

### Phase 2 — Reliable campaign delivery

- Saved segments and campaign creation.
- Background jobs, retries, idempotency, and delivery-status tracking.
- Simulated notification provider before real channel integrations.

### Phase 3 — Evidence and scale

- Evidence uploads and attachment lifecycle management.
- Full-text search where relational search no longer meets product needs.
- Observability, operational dashboards, and incident-oriented runbooks.

## API contracts and generated client

The shared Zod schemas in `packages/contracts` define CRM response shapes. The CRM service
uses those schemas to generate and serve an OpenAPI 3.1 document at `/openapi.json`.

Regenerate the checked-in OpenAPI document and the web application's typed fetch client and
TanStack Query options after changing an API contract:

```sh
pnpm generate:client
```

The generated client is in `apps/web/src/api/generated`. Application code should import its
query options rather than hand-writing fetch calls for documented CRM endpoints.

When running Docker Compose, the web service proxies `/api` and `/openapi.json` to the CRM
service. This keeps the browser on one origin in both development and production.

## Status

Ghost CRM is currently in product-definition and architecture-planning. This README describes the intended product and engineering scope; implementation details and local setup instructions will be added as the application is built.

## License

This project is licensed under the [MIT License](LICENSE).
