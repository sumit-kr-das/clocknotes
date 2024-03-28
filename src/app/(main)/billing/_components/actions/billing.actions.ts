"use server";
import GetSession from "@/lib/get-session";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import Stripe from "stripe";
import { redirect } from "next/navigation";
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2023-10-16",
});
export const createCheckoutSession = async () => {
  const user = await getSession();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1OzJxMSEFisHGGgezP8ysUES",
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        tenantId: user.tenantId,
      },
    },
    mode: "subscription",
    success_url: `${process.env.APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/billing?canceled=true`,
  });
  redirect(session.url || "");
};

export const createPortalSession = async () => {
  const user = await getSession();
  const tenant = await db.tenant.findUnique({
    where: { id: user.tenantId },
  });
  if (!tenant) throw new Error("No tenant found");
  if (!tenant.stripeCustomerId) throw new Error("No stripe customer id");

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: tenant.stripeCustomerId,
    return_url: `${process.env.APP_URL}/billing`,
  });
  redirect(portalSession.url);
};
