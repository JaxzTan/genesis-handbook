# Development Dockerfile for the Genesis handbook (Next.js)
FROM node:20-alpine

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
# The lockfile is optional (package-lock.json* won't fail if absent),
# so use `npm install` rather than `npm ci`, which requires a lockfile.
# Copy the Prisma schema before install: the `postinstall` script runs
# `prisma generate`, which needs prisma/schema.prisma to be present.
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install

# Copy the rest of the application source
COPY . .

# Next.js dev server listens on port 3000 by default (override via PORT in .env)
EXPOSE 3000

CMD ["npm", "run", "dev"]
