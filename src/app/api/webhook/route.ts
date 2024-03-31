import db from "@/lib/db";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
// export async function POST(
//   req: NextRequest,
// ): Promise<NextResponse<{ received: string }> | { status: number }> {
//   let event: Stripe.Event | undefined;
//   try {
//     const singnature = req.headers.get("stripe-signature") || "";
//     event = stripe.webhooks.constructEvent(
//       await req.text(),
//       singnature,
//       ENDPOINT_SECRET,
//     );
//   } catch (e: any) {
//     console.log("webhook singnature verification failed", e.message);
//     return (
//       new NextResponse(JSON.stringify({ error: "invalid payload" })),
//       {
//         status: 400,
//       }
//     );
//   }
//   switch (event.type) {
//     case `customer.subscription.updated`:
//       const subscription = event.data.object as Stripe.Subscription;
//       console.log(subscription.cancel_at, "nulling");
//       await db.tenant.update({
//         where: {
//           id: subscription.metadata.tenantId,
//         },
//         data: {
//           expirationDate: subscription.cancel_at
//             ? new Date(subscription.cancel_at * 1000)
//             : null,
//         },
//       });
//   }
//   return NextResponse.json({ received: true });
// }

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log("Event", event?.type);

    switch (event.type) {
      case `customer.subscription.updated`:
        const subscription = event.data.object as Stripe.Subscription;
        console.log(subscription.cancel_at, "nulling");
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

    return NextResponse.json({
      status: "success",
      event: event.type,
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
