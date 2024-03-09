import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { pad } from "@/app/(main)/timer/__components/timer-activity";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  updateEndDate,
  updateStartDate,
} from "@/app/(main)/timer/__components/timerActivity/activity-action";

type ActivityDateProps = {
  id: string;
  name: string;
  date: Date;
};

const ActivityDate = ({ id, date, name }: ActivityDateProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const onDate = (d: Date | undefined) => {
    if (!d) return;
    d.setHours(date.getHours());
    d.setMinutes(date.getMinutes());
    d.setSeconds(date.getSeconds());
    setNewDate(d);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "numeric",
          })
            .format(date)
            .toUpperCase()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <input type="hidden" name="id" defaultValue={id} />
              <Label htmlFor="time">Time</Label>
              <Input
                value={`${pad(newDate.getHours())}:${pad(newDate.getMinutes())}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":");
                  const time = new Date(newDate);
                  time.setHours(parseInt(hours) || 0);
                  time.setMinutes(parseInt(minutes) || 0);
                  setNewDate(time);
                }}
                name={name}
                id="width"
                className="col-span-2 h-8"
                type="time"
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
                    onSelect={onDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button
            type="submit"
            onClick={
              name === "startAt"
                ? async () => updateStartDate(id, newDate)
                : async () => updateEndDate(id, newDate)
            }
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityDate;
