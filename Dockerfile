# Stage 1: Build the Astro site
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the static site
RUN pnpm build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# nginx runs in foreground by default with this config
CMD ["nginx", "-g", "daemon off;"]
