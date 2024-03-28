import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  console.log("webhook received");
  let event: Stripe.Event | undefined;
  try {
    const singnature = req.headers.get("stripe-signature") || "";
    event = stripe.webhooks.constructEvent(
      await req.text(),
      singnature,
      ENDPOINT_SECRET,
    );
  } catch (e: any) {
    console.log("webhook singnature verification failed", e.message);
    return (
      new NextResponse(JSON.stringify({ error: "invalid payload" })),
      {
        status: 400,
      }
    );
  }
  switch (event.type) {
    case `customer.subscription.updated`:
      const subscription = event.data.object as Stripe.Subscription;
      console.log(subscription.cancel_at);
      await db.tenant.update({
        where: {
          id: subscription.metadata.tenantId,
        },
        data: {
          expirationDate: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null,
        },
      });
  }
  return NextResponse.json({ received: true });
}
