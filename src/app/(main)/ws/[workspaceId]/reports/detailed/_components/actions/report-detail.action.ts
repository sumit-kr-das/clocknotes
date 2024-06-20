"use server";
import db from "@/lib/db";
import dayjs from "dayjs";

export const getDetailActivityReport = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const now = dayjs().endOf("day");
    const sevenDaysAgo = dayjs().startOf("day").subtract(6, "day"); // Set sevenDaysAgo to the start of 7 days ago
    let query: any = {
      where: {
        workspaceId: workspaceId,
        startAt: {
          gte: sevenDaysAgo.toDate(),
          lte: now.toDate(),
        },
      },
      include: {
        project: {
          select: {
            name: true,
            rate: true,
            currencyType: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    };
    const activity = await db.activity.findMany(query);
    return activity;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};
