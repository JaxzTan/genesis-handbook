import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 uses the "client" engine, which requires a driver adapter.
// We connect to Postgres (Supabase) via the pg adapter using the pooled
// runtime connection string.
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

// Reuse a single PrismaClient across hot reloads in development. Without this,
// Next.js would instantiate a new client on every change and exhaust the
// database connection pool. In production a single instance is created per
// server process.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
