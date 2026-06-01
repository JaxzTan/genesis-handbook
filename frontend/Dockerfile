# Development Dockerfile for the Next.js frontend
FROM node:20-alpine

WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source
COPY . .

# Next.js dev server listens on port 3004 (HOSTNAME/PORT come from .env)
EXPOSE 3004

CMD ["npm", "run", "dev"]
