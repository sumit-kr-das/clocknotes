"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function updateTitle(data: FormData) {
  console.log("Data is", data);

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

export async function updateStartDate(id: string, date: Date) {
  await db.activity.update({
    where: {
      id,
    },
    data: {
      startAt: date,
    },
  });

  revalidatePath("/track");
}

export async function updateEndDate(id: string, date: Date) {
  await db.activity.update({
    where: {
      id,
    },
    data: {
      endAt: date,
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
