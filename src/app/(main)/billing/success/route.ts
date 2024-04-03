import getSession from "@/lib/get-session";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getSession();
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    redirect("/billing");
  }
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  const customerId = checkoutSession.customer as string;

  await db.tenant.update({
    where: {
      id: user.tenantId,
    },
    data: {
      stripeCustomerId: customerId,
      expirationDate: null,
      plan: "PRO",
    },
  });
  redirect("/billing");
}
