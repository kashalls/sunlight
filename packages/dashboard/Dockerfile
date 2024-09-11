# Base Environment
FROM oven/bun AS base

## Setup a base environment. This is the root of where the app will run.
RUN mkdir -p /sunlight
WORKDIR /sunlight

# Build Environment
FROM base AS build

## Copy lock + package file.
COPY bun.lockb ./
COPY ./packages/dashboard/package.json ./

## Install, copy remaining packages and build the webserver.
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Final Container
FROM base AS release

## Copy build output.
COPY --from=build /sunlight/.output /sunlight/.output

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", ".output/server/index.mjs"]