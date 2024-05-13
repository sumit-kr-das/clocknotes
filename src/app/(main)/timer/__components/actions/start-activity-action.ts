"use server";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export const startActivity = async ({
  name,
  newStartAt,
}: {
  name: string;
  newStartAt: Date;
}) => {
  const user = await getSession();
  await db.activity.create({
    data: {
      user: { connect: { id: user.id } },
      tenant: { connect: { id: user.tenantId } },
      name: name,
      startAt: newStartAt,
    },
  });
  revalidatePath("/timer");
};
