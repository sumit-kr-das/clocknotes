"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";
import { Activity } from "@prisma/client";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pad } from "@/app/(main)/timer/__components/timer-activity";

const ActivityDate = ({ date }: { date: Date }) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "numeric",
          }).format(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Update task date & time
            </h4>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Time</Label>
              <Input
                value={`${pad(newDate.getHours())}:${pad(newDate.getMinutes())}`}
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
                type={"time"}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "col-span-2 h-8 justify-start text-left font-normal",
                      !newDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDate ? (
                      format(newDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

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
            <CardTitle>{activity.name}</CardTitle>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ActivityDate date={activity.startAt} />
            <ArrowRight size={16} />
            <ActivityDate date={activity.endAt || new Date()} />
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
