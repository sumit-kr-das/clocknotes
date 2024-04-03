import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import { getServerSession } from "next-auth";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2023-10-16",
});

export const hasSubscription = async () => {
  const user = await getSession();
  if (user) {
    const tenent = await db.tenant.findUnique({
      where: {
        id: user.tenantId,
      },
    });
    if (!tenent?.stripeCustomerId) {
      return false;
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: String(tenent?.stripeCustomerId),
    });
    return subscriptions.data.length > 0;
  }
  return false;
};
