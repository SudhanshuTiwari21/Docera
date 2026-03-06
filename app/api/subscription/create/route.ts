import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { createPlan, createSubscription } from "@/lib/razorpay";

const PLAN_MONTHLY_ID = process.env.RAZORPAY_PLAN_MONTHLY_ID;
const PLAN_YEARLY_ID = process.env.RAZORPAY_PLAN_YEARLY_ID;
const KEY_ID = process.env.RAZORPAY_KEY_ID;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to subscribe" }, { status: 401 });
  }

  let body: { plan?: "monthly" | "yearly" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const plan = body.plan ?? "monthly";
  if (plan !== "monthly" && plan !== "yearly") {
    return NextResponse.json({ error: "Plan must be monthly or yearly" }, { status: 400 });
  }

  if (!KEY_ID) {
    return NextResponse.json({ error: "Razorpay is not configured" }, { status: 503 });
  }

  let planId: string;
  try {
    planId = plan === "yearly" ? (PLAN_YEARLY_ID ?? await createPlan("yearly")) : (PLAN_MONTHLY_ID ?? await createPlan("monthly"));
  } catch (err: unknown) {
    console.error("[subscription/create] plan", err);
    const raw = err as { statusCode?: number; error?: { description?: string; code?: string }; description?: string; message?: string };
    if (raw?.statusCode === 401) {
      return NextResponse.json(
        {
          error:
            "Razorpay authentication failed. Check that RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correct, from the same key pair, and both Test or both Live.",
        },
        { status: 502 }
      );
    }
    const message =
      raw?.error?.description ?? raw?.description ?? (err instanceof Error ? err.message : null) ?? "Failed to get plan";
    const hint =
      message === "Failed to get plan"
        ? " Enable Subscriptions in Razorpay Dashboard (Payment products) and use correct API keys (Test/Live)."
        : "";
    return NextResponse.json({ error: message + hint }, { status: 500 });
  }

  try {
    const subscriptionId = await createSubscription(planId, session.sub);

    await query(
      `INSERT INTO subscriptions (user_id, razorpay_subscription_id, razorpay_plan_id, status, tier)
       VALUES ($1, $2, $3, 'created', 'premium')`,
      [session.sub, subscriptionId, planId]
    );

    return NextResponse.json({
      subscription_id: subscriptionId,
      key: KEY_ID,
    });
  } catch (err: unknown) {
    console.error("[subscription/create]", err);
    const raw = err as { statusCode?: number; error?: { description?: string; code?: string } };
    if (raw?.statusCode === 401) {
      return NextResponse.json(
        {
          error:
            "Razorpay authentication failed. Check that RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correct, from the same key pair, and both Test or both Live.",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
