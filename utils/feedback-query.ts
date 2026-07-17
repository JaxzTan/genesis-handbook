import type { Prisma } from "@prisma/client";
import type { FeedbackFilter } from "@/validations/admin";

// Translates dashboard filters into a Prisma query. Pure and Prisma-client-free
// at runtime (the import is type-only), so it can be unit tested without a DB.

export function buildFeedbackWhere(
  filter: FeedbackFilter
): Prisma.FeedbackWhereInput {
  const where: Prisma.FeedbackWhereInput = {};

  if (filter.rating === "none") {
    where.rating = null;
  } else if (filter.rating !== "all") {
    where.rating = Number(filter.rating);
  }

  if (filter.hasEmail === "yes") {
    where.email = { not: null };
  } else if (filter.hasEmail === "no") {
    where.email = null;
  }

  // Free-text search spans the message and the (optional) name, so you can find
  // a submission either by what it said or by who said it.
  if (filter.q) {
    where.OR = [
      { message: { contains: filter.q, mode: "insensitive" } },
      { name: { contains: filter.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export function buildFeedbackOrderBy(
  filter: FeedbackFilter
): Prisma.FeedbackOrderByWithRelationInput {
  return { createdAt: filter.sort === "oldest" ? "asc" : "desc" };
}

/** True when the filters would narrow the list at all. */
export function isFiltered(filter: FeedbackFilter): boolean {
  return (
    filter.rating !== "all" || filter.hasEmail !== "all" || filter.q !== ""
  );
}
