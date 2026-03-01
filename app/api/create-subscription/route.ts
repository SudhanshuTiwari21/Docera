import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const PLAN_AMOUNT_PAISE = 14900; // ₹149
const CURRENCY = "INR";
const PLAN_INTERVAL = "monthly";

export async function POST() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const planId = process.env.RAZORPAY_PLAN_ID;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 }
    );
  }

  try {
    const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });

    let effectivePlanId = planId;

    if (!effectivePlanId) {
      const plan = await instance.plans.create({
        period: PLAN_INTERVAL,
        interval: 1,
        item: {
          name: "Dockera Premium",
          amount: PLAN_AMOUNT_PAISE,
          currency: CURRENCY,
          description: "Unlimited image resizing and document tools",
        },
      });
      effectivePlanId = plan.id;
    }

    const subscription = await instance.subscriptions.create({
      plan_id: effectivePlanId,
      quantity: 1,
      total_count: 12,
    });

    return NextResponse.json({
      subscription_id: subscription.id,
      key: keyId,
    });
  } catch (err) {
    console.error("[create-subscription]", err);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
