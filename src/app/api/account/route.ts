import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await db.tenant.updateMany({
    where: {
      expirationDate: {
        lte: new Date(),
      },
    },
    data: {
      plan: "FREE",
    },
  });
  return NextResponse.json({ updated: res.count });
}
