# Development Dockerfile for the Next.js frontend
FROM node:20-alpine

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
# The lockfile is optional (package-lock.json* won't fail if absent),
# so use `npm install` rather than `npm ci`, which requires a lockfile.
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application source
COPY . .

# Next.js dev server listens on port 3004 (HOSTNAME/PORT come from .env)
EXPOSE 3004

CMD ["npm", "run", "dev"]
