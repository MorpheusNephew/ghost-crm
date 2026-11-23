FROM node:24.22.3-alpine AS dependencies
WORKDIR /workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN corepack enable && pnpm install --frozen-lockfile --filter web...

# Development runs Vite against a bind-mounted working tree for hot reload.
FROM dependencies AS development
WORKDIR /workspace/apps/web
EXPOSE 5173
CMD ["pnpm", "--filter", "web", "exec", "vite", "--host", "0.0.0.0"]

# The production artifact is compiled before it enters the minimal web-server image.
FROM dependencies AS build
COPY apps/web/ apps/web/
RUN pnpm --filter web build

FROM caddy:2.10-alpine AS production
COPY infra/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /workspace/apps/web/dist /srv
EXPOSE 80
