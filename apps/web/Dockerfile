# ── Stage 1: Build ──
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

# Copy workspace root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package manifests
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/shared/ packages/shared/
COPY apps/web/ apps/web/

# Build args for Vite env
ARG VITE_API_URL=/api

# Build shared + web
RUN pnpm --filter @modme/shared build 2>/dev/null || true
RUN pnpm --filter web build

# ── Stage 2: Serve with Nginx ──
FROM nginx:alpine AS production

# Copy built static files
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
