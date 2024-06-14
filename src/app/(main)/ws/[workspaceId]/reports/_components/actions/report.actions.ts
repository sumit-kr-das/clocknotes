import db from "@/lib/db";
import getActivityTime from "@/lib/get-activity-time";

export const getWeeklyActivityReport = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  const activities = await db.activity.findMany({
    where: {
      startAt: {
        gte: sevenDaysAgo,
        lte: now,
      },
    },
  });
  const activityTimeByDay = Array(7).fill(0);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + i);
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }
  activities.forEach((activity) => {
    const startAt = new Date(activity.startAt);
    const durationMinutes = getActivityTime(activity.startAt, activity.endAt);

    const dayIndex = Math.floor(
      (Number(startAt) - Number(sevenDaysAgo)) / (24 * 60 * 60 * 1000),
    );

    activityTimeByDay[dayIndex] += durationMinutes;
  });
  return { activities: activityTimeByDay, dates };
};
export const getActivityReport = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const activities = await db.activity.findMany({
      where: {
        workspaceId: workspaceId,
        endAt: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });

    // Get the number of days in the current month
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();

    // Initialize an array to hold the total activity time for each day
    const activityTimeByDay = Array(daysInMonth).fill(0);

    activities.forEach((activity) => {
      // Calculate the difference in milliseconds and convert to minutes
      const endAt = new Date(activity.endAt || "");

      const durationMinutes = getActivityTime(activity.startAt, activity.endAt);
      // Get the day of the month (1-31) and adjust for zero-based index
      const day = endAt.getDate() - 1;

      // Accumulate the total activity time for the corresponding day
      activityTimeByDay[day] += durationMinutes;
    });

    return activityTimeByDay;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};
