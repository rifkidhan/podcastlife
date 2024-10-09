FROM node:lts-alpine AS base

# all dependencies
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# production dependencies
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# builder
FROM base AS builder
WORKDIR /app
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 podcastlife

COPY --from=prod-deps --chown=podcastlife:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=podcastlife:nodejs /app/build ./build
COPY package.json ./

USER podcastlife

ARG PORT

EXPOSE ${PORT:-8080}

ENV HOST="0.0.0.0"
ENV PORT=${PORT:-8080}
ENV ORIGIN=""

ENTRYPOINT ["node", "build"]
