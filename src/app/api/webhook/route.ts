import db from "@/lib/db";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import trainsporter from "@/lib/trainsporter";

const ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  try {
    let event = stripe.webhooks.constructEvent(payload, sig!, ENDPOINT_SECRET!);

    console.log("Event", event?.type);

    switch (event.type) {
      case `payment_intent.succeeded`:
        console.log("hello");
        const id = event.data.object.metadata.tenantId;
        const user = await db.user.findFirst({
          where: {
            tenantId: id,
          },
        });
        await trainsporter.sendMail({
          from: '"Clocknotes" <support@clocknotes.cloud>', // sender address
          to: `${user?.email}, shoyebjio3398@gmail.com`, // list of receivers
          subject: "Your Clocknotes Subscription Is Successfull ✔", // Subject line
          text: "Your subscription for clocknotes is successfull. ", // plain text body
          html: `<b>Congratulations ${user?.name} </b>
<br/>
<p>Your premium subscription for Clocknotes has been activated. You can download your Invoices and manage subscription from Billing section of your dashboard</p>
`, // html body
        });
        break;
      case `customer.subscription.updated`:
        const subscription = event.data.object as Stripe.Subscription;
        console.log(subscription, "nulling");
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
