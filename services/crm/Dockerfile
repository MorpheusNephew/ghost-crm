FROM node:24.22.3-alpine AS dependencies

WORKDIR /workspace/services/crm

COPY services/crm/package.json services/crm/package-lock.json ./
RUN npm ci

FROM dependencies AS development

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM dependencies AS build

COPY services/crm/ ./
RUN npm run build

FROM node:24.22.3-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY services/crm/package.json services/crm/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /workspace/services/crm/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]
