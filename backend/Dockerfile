# Use an official Node runtime as a parent image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (leverage layer cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose the port your app listens on
# (change if your app listens on a different port)
EXPOSE 5000

# Default environment variables (optional)
ENV NODE_ENV=production
ENV PORT=5000

# Start the app
CMD ["npm", "run", "start"]
