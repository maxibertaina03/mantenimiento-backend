# syntax=docker/dockerfile:1.7
# =============================================================================
# Multi-stage Dockerfile para NestJS + Prisma
# =============================================================================

# --- Base con pnpm ---------------------------------------------------------------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# --- Instalación de dependencias -------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm prisma generate

# --- Development -----------------------------------------------------------------
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# --- Build -----------------------------------------------------------------------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build
RUN pnpm prune --prod

# --- Production ------------------------------------------------------------------
FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]
