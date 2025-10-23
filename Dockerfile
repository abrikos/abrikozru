# Stage 1: Build the Nuxt application
FROM node:22-alpine AS build
WORKDIR /app

# Enable Corepack for package manager management (e.g., pnpm)
RUN corepack enable

# Copy package.json and lockfile (e.g., pnpm-lock.yaml)
COPY package.json ./

# Install dependencies
RUN yarn

# Copy the entire project
COPY . ./

# Build the Nuxt application for production
# Assuming 'npm run build' or 'pnpm build' is configured to build for production
ARG MONGODB_URI
RUN echo "zzzzzzzzzzzzz ${MONGODB_URI}"
ENV MONGODB_URI=$MONGODB_URI
RUN yarn build

# Stage 2: Serve the Nuxt application
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
# Command to start the Nuxt server
CMD ["node", ".output/server/index.mjs"]