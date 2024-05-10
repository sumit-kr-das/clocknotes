import db from "@/lib/db";
import getSession from "@/lib/get-session";
import React from "react";
import NewActivity from "./__components/new-ativity";
import DailyActivities from "@/app/(main)/ws/[workspaceId]/timer/__components/timerActivity/timer-daily-activities";

const TimerPage = async () => {
  const user = await getSession();

  const currentActivity = await db.activity.findFirst({
    where: {
      tenantId: user.tenantId,
      userId: user.id,
      endAt: null,
    },
  });

  const dailyActivities = await db.activity.findMany({
    where: {
      tenantId: user.tenantId,
      userId: user.id,
      endAt: {
        not: null,
      },
    },
    orderBy: {
      startAt: "desc",
    },
  });

  return (
    <section className="w-full">
      <NewActivity activity={currentActivity} />
      <DailyActivities activities={dailyActivities} />
    </section>
  );
};

export default TimerPage;
