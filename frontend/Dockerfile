# --- Build stage ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (use package-lock / pnpm-lock / yarn.lock if present)
COPY package*.json ./
# If you use pnpm or yarn, replace the command accordingly
RUN npm ci --silent

# Copy rest of source and build
COPY . .
# Build the production files into /app/dist
RUN npm run build


# --- Production stage (nginx) ---
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA fallback (see nginx.conf below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3000

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
