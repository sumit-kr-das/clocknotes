"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const stopActivity = async (id: string) => {
  await db.activity.update({
    where: {
      id: id,
    },
    data: {
      endAt: new Date(),
    },
  });
  revalidatePath("/timer");
};
