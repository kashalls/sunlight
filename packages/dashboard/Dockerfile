FROM oven/bun AS builder

WORKDIR /sunlight
COPY . .

# Install monorepo dependencies
RUN bun install

# Run Nuxt Build on dashboard
RUN bunx nuxt build --cwd ./packages/dashboard

# Final Container
FROM oven/bun

WORKDIR /sunlight

## Copy build output.
COPY --from=builder /sunlight/packages/dashboard/.output /sunlight/.output

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", ".output/server/index.mjs"]
