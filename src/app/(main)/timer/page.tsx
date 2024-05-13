import db from "@/lib/db";
import getSession from "@/lib/get-session";
import React from "react";
import DailyActivities from "@/app/(main)/timer/__components/timerActivity/timer-daily-activities";
import NewActivity from "./__components/new-ativity";

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

  console.log(currentActivity);

  return (
    <section className="w-full">
      <NewActivity activity={currentActivity} />
      <DailyActivities activities={dailyActivities} />
    </section>
  );
};

export default TimerPage;
