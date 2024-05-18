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

const DailyActivities = ({ activities }: DailyActivitiesProp) => {
  return (
    <div className="mt-10">
      <div>
        <h1>What you have done today</h1>
      </div>
      {activities?.map((activity) => (
        <Card
          key={activity.id}
          className="mt-4 p-4 flex items-center justify-between"
        >
          <div className="w-1/2">
            <ActivityTitle id={activity.id} title={activity.name} />
          </div>

          <ActivityDate
            name="startAt"
            id={activity.id}
            date={activity.startAt}
          />
          <ArrowRight size={16} />
          <ActivityDate
            name="endAt"
            id={activity.id}
            date={activity.endAt || new Date()}
          />
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={async () => deleteActivity(activity.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DailyActivities;
