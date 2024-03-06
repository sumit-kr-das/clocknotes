import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import { getUserSession } from "@/lib/get-session";
import { GanttChartSquare, Tag } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

const NewActivity = () => {
  return (
    <div className="w-full flex items-center justidy-between gap-4 border p-4 bg-accent rounded-md">
      <Input
        className="w-[70%] block"
        type="email"
        placeholder="What are you working on?"
      />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <GanttChartSquare />
        </Button>
        <Button variant="outline" size="icon">
          <Tag />
        </Button>
        <div>
          <TimerActivity startAt={new Date()} />
        </div>
        <Button>Start</Button>
      </div>
    </div>
  );
};
const DailyActivities = () => {};

const TimerPage = async () => {
  const sessions = await getUserSession();
  console.log("sess", sessions);

  // const currentActivity = await db.activity.findFirst({
  //   where: {
  //     tenantId: session.user.tenantId,
  //     userId: session.user.id,
  //     endAt: null
  //   },
  // });
  return (
    <section className="w-full">
      <NewActivity />
    </section>
  );
};

export default TimerPage;
