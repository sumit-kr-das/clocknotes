"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { Activity } from "@prisma/client";
import { ArrowRight, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteActivity } from "@/app/(main)/ws/[workspaceId]/timer/__components/timerActivity/activity-action";
import ActivityDate from "@/app/(main)/ws/[workspaceId]/timer/__components/timerActivity/timer-activity-date";
import ActivityTitle from "@/app/(main)/ws/[workspaceId]/timer/__components/timerActivity/timer-activity-title";
import { differenceInMilliseconds } from "date-fns";

type DailyActivitiesProp = {
  activities: Activity[];
};

const TotalTime = ({
  startTime,
  endTime,
}: {
  startTime: Date;
  endTime: Date;
}) => {
  const totalMilliseconds = differenceInMilliseconds(endTime, startTime);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hoursDifference = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutesDifference = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secondsDifference = (totalSeconds % 60).toString().padStart(2, "0");
  return (
    <div>
      <p className="font-semibold">
        {hoursDifference}:{minutesDifference}:{secondsDifference}
      </p>
    </div>
  );
};

const DailyActivities = ({ activities }: DailyActivitiesProp) => {
  return (
    <div className="mt-10">
      <div>
        <h1>What you have done today</h1>
      </div>
      {activities?.map((activity) => (
        <Card
          key={activity.id}
          className="w-full mt-4 p-4 flex items-center justify-between"
        >
          {/* title */}
          <div className="w-full">
            <ActivityTitle id={activity.id} title={activity.name} />
          </div>
          <div className=" flex items-center gap-8">
            {/* start-end time */}
            <div className="flex items-center">
              <ActivityDate
                name="startAt"
                id={activity.id}
                date={activity.startAt}
              />
              <p className="font-semibold mx-2">to</p>
              <ActivityDate
                name="endAt"
                id={activity.id}
                date={activity.endAt || new Date()}
              />
            </div>
            {activity?.endAt ? (
              <TotalTime
                startTime={activity.startAt}
                endTime={activity.endAt}
              />
            ) : (
              <p className="font-semibold">00:00:00</p>
            )}
            <div className="cursor-pointer">
              <Play className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={async () => deleteActivity(activity.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DailyActivities;
