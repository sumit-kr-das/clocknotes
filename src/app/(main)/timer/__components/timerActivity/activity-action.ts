"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function updateTitle(data: FormData) {
  await db.activity.update({
    where: {
      id: data.get("id") as string,
    },
    data: {
      name: data.get("name") as string,
    },
  });

  revalidatePath("/track");
}

export async function updateDate(data: FormData) {
  await db.activity.update({
    where: {
      id: data.get("id") as string,
    },
    data: {
      startAt: data.get("startAt") as string,
      endAt: data.get("endAt") as string,
    },
  });

  revalidatePath("/track");
}

export async function deleteActivity(id: string) {
  await db.activity.delete({
    where: {
      id,
    },
  });
  revalidatePath("/track");
}
