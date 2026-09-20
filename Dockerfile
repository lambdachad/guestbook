FROM oven/bun:1.4 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN TARGET=server bun --bun vite build

FROM oven/bun:1.4-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/build/server ./build/server
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3000

CMD ["bun", "build/server/index.js"]
