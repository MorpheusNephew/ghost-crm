# Ghost CRM

Ghost CRM is a systems-design portfolio project for haunted attractions, Halloween events, paranormal tours, and ghost-hunting communities. It explores how an operational CRM can manage ghost profiles, venues, and event staffing while keeping the domain playful and the engineering credible.

## Current status

The repository contains a runnable v1 demo: a React web application, an Express CRM API, shared Zod contracts, an OpenAPI document, and a generated typed web client.

The current demo uses fixed data and read-only endpoints. It supports viewing:

- Ghost profiles, including lifecycle and threat-level information.
- One-time events at a single venue, with one or more assigned ghosts.
- Event details and roster information.
- Venue and overview data used by the web application.

Authentication, organizations, persisted data, scheduling writes, sightings, and campaigns are intentionally future work. The [initial data-model requirements](docs/initial-data-model-requirements.md) describe the decisions made so far and distinguish the v1 scope from later work.

## Repository layout

```text
apps/web              React and Vite web application
services/crm          Express CRM API
packages/contracts    Shared Zod schemas and OpenAPI metadata
```

## Prerequisites

- Node.js 24 (the version used in CI)
- pnpm 10.33.4 or later
- Docker Desktop and Docker Compose, if using the containerized environments

Install dependencies for local commands:

```sh
pnpm install --frozen-lockfile
```

## Run with Docker Compose

The Makefile is the recommended way to start the local environments.

```sh
make dev
```

This starts the hot-reloading web application at <http://localhost:5173>, a local load balancer at <http://localhost:3000>, and two CRM API replicas by default. The load balancer keeps the CRM API URL stable while distributing requests across healthy instances. Stop the environment with:

```sh
make dev-down
```

To run the production-like containers instead, use:

```sh
make prod
```

The production web application is available at <http://localhost:8080>. Stop it with `make prod-down`.

Pass Docker Compose flags through `COMPOSE_ARGS`; for example, run either environment in the background with:

```sh
make dev COMPOSE_ARGS="--detach"
```

Set `CRM_REPLICAS` to choose a different number of CRM instances:

```sh
make dev CRM_REPLICAS=3
```

Use `make help` to see all available environment and log commands.

### Development logs

The CRM service emits structured JSON request logs with a request ID, response time,
status code, and replica identifier. Health checks are excluded. Follow only the CRM
request logs or load-balancer access logs with:

```sh
make dev-api-logs
make dev-load-balancer-logs
```

### Local trace viewer

`make dev` also starts an OpenTelemetry Collector and Jaeger. Open
<http://localhost:16686> to inspect traces locally. The browser exports spans to
the same-origin `/otel` endpoint, the Collector forwards them to Jaeger, and the
CRM replicas export their server spans to that same Collector. A browser request
to `/api` therefore appears as one distributed trace across the web app and CRM
service.

The Collector and Jaeger are local development infrastructure only. A production
deployment can keep the application instrumentation and route OTLP data to a
managed observability backend through its own Collector configuration.

## API contracts and generated client

Shared Zod schemas in `packages/contracts` define CRM response shapes and OpenAPI metadata. The CRM service serves the generated OpenAPI 3.1 document at `/openapi.json`.

After changing a contract or documented endpoint, regenerate both tracked artifacts:

```sh
pnpm generate:client
```

This updates `services/crm/openapi.json` and the typed client in `apps/web/src/api/generated`. Web application code should use the generated query options rather than hand-written fetch calls for documented endpoints.

When using Docker Compose, the web service proxies `/api` and `/openapi.json` through the local load balancer to the CRM service replicas, keeping the browser on one origin in development and production.

## Quality checks

Run formatting and the focused test suites locally:

```sh
pnpm format:check
pnpm --filter @ghost-crm/contracts test:coverage
pnpm --filter @ghost-crm/crm test:coverage
pnpm --filter web test:coverage
```

Build each production artifact with:

```sh
pnpm --filter @ghost-crm/contracts build
pnpm --filter @ghost-crm/crm build
pnpm --filter web build
```

## Continuous integration

GitHub Actions runs for pull requests targeting `main` and for pushes to `main`. It verifies:

- Prettier formatting and web linting.
- OpenAPI and generated-client artifacts are current.
- Contract, CRM, and web test suites meet their coverage thresholds.
- Production builds for contracts, the CRM service, and the web application.

## Product direction

The project is intended to make systems-design decisions visible. Future work will add persisted, organization-scoped records; authorization; scheduling conflict handling; audit history; sightings; and campaign delivery. The data model and product decisions will evolve incrementally from the v1 demo rather than assuming all of that complexity at the outset.

## License

This project is licensed under the [MIT License](LICENSE).
