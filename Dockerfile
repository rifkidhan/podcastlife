FROM node:iron-alpine AS BASE

# all dependencies
FROM BASE AS DEPS
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile


# rebuild
FROM BASE AS BUILDER
WORKDIR /app
COPY --from=DEPS /app/node_modules ./node_modules
COPY . .

RUN yarn build


# runner
FROM BUILDER AS RUNNER
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 podcastlife

COPY --from=BUILDER --chown=podcastlife:nodejs /app/build ./build
COPY --from=BUILDER /app/node_modules ./node_modules
COPY package.json .

USER podcastlife

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV API_URL=""
ENV API_TOKEN=""

CMD [ "node", "build" ]