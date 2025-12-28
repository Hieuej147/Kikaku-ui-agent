import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 2;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1;

export async function getUsagetrack() {
  const { has } = await auth();
  const hasPremium = has({ plan: "pro" });
  const usageTrack = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasPremium ? PRO_POINTS : FREE_POINTS,
    duration: DURATION,
  });
  return usageTrack;
}

export async function consumeCredits() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const usageTacker = await getUsagetrack();

  const result = await usageTacker.consume(userId, GENERATION_COST);

  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const usageTacker = await getUsagetrack();

  const result = await usageTacker.get(userId);
  return result;
}
