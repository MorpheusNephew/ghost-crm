# Install dependencies once so development and production builds use the same lockfile.
FROM node:22-alpine AS dependencies
WORKDIR /workspace/apps/web
COPY apps/web/package.json apps/web/package-lock.json ./
RUN npm ci

# Development runs Vite against a bind-mounted working tree for hot reload.
FROM dependencies AS development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# The production artifact is compiled before it enters the minimal web-server image.
FROM dependencies AS build
COPY apps/web/ ./
RUN npm run build

FROM caddy:2.10-alpine AS production
COPY infra/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /workspace/apps/web/dist /srv
EXPOSE 80
