import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { Activity } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { differenceInMilliseconds, formatDuration } from "date-fns";

type DailyActivitiesProp = {
  activities: Activity[];
};

const DailyActivities = ({ activities }: DailyActivitiesProp) => {
  console.log(activities);
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
            <CardTitle>{activity.name}</CardTitle>
            <CardDescription>Total-</CardDescription>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl text-bold uppercase">
              {new Intl.DateTimeFormat(undefined, {
                hour: "numeric",
                minute: "numeric",
              }).format(activity.startAt)}
            </p>
            <ArrowRight size={16} />
            <p className="text-xl text-bold uppercase">
              {new Intl.DateTimeFormat(undefined, {
                hour: "numeric",
                minute: "numeric",
              }).format(activity.endAt || new Date())}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="secondary">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DailyActivities;
