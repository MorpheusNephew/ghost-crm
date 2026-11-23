FROM node:24.22.3-alpine AS dependencies

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/contracts/package.json packages/contracts/package.json
COPY services/crm/package.json services/crm/package.json
RUN corepack enable && pnpm install --frozen-lockfile --filter @ghost-crm/crm...

FROM dependencies AS development

WORKDIR /workspace/services/crm

EXPOSE 3000

CMD ["pnpm", "--filter", "@ghost-crm/crm", "dev"]

FROM dependencies AS build

COPY packages/contracts/ packages/contracts/
COPY services/crm/ services/crm/
RUN pnpm --filter @ghost-crm/contracts build && pnpm --filter @ghost-crm/crm build

FROM node:24.22.3-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/contracts/package.json packages/contracts/package.json
COPY services/crm/package.json services/crm/package.json
RUN corepack enable && pnpm install --frozen-lockfile --prod --filter @ghost-crm/crm...
COPY --from=build /workspace/packages/contracts/dist ./packages/contracts/dist
COPY --from=build /workspace/services/crm/dist ./services/crm/dist

USER node

EXPOSE 3000

CMD ["node", "services/crm/dist/server.js"]
