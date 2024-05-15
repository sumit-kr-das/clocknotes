"use server";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export const startActivity = async ({
  name,
  newStartAt,
  projectId,
  billable,
}: {
  name: string;
  newStartAt: Date;
  projectId: string;
  billable: boolean;
}) => {
  const user = await getSession();
  try {
    await db.activity.create({
      data: {
        name: name,
        isBillable: billable,
        startAt: newStartAt,
        user: { connect: { id: user.id } },
        tenant: { connect: { id: user.tenantId } },
        Project: { connect: { id: projectId } },
      },
    });
  } catch (error: any) {
    return { error: error?.message || "Failed start timer" };
  } finally {
    revalidatePath("/timer");
  }
};
