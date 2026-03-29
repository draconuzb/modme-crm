# ── Stage 1: Build ──
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

# Copy workspace root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package manifests
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

# Install all deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/shared/ packages/shared/
COPY apps/api/ apps/api/

# Generate Prisma client + Build
RUN cd apps/api && npx prisma generate
RUN pnpm --filter @modme/shared build 2>/dev/null || true
RUN pnpm --filter api build

# ── Stage 2: Production ──
FROM node:20-alpine AS production

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile --prod

# Copy built output + prisma
COPY --from=builder /app/apps/api/dist apps/api/dist
COPY --from=builder /app/apps/api/prisma apps/api/prisma
COPY --from=builder /app/packages/shared packages/shared

# Copy generated Prisma client from builder
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api || exit 1

CMD ["sh", "-c", "cd apps/api && npx prisma migrate deploy && node dist/main.js"]
