FROM node:iron-alpine AS base

# all dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile


# rebuild
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build


# runner
FROM builder AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 podcastlife

COPY --from=builder --chown=podcastlife:nodejs /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

USER podcastlife

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV API_URL=""
ENV API_TOKEN=""

CMD [ "node", "build" ]
