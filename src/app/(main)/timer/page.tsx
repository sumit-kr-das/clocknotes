"use client";
import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GanttChartSquare, Tag } from "lucide-react";
import React from "react";

const TimerPage = () => {
  return (
    <section className="w-full">
      <div className="flex items-center gap-4 border p-4 bg-accent rounded-md">
        <Input type="email" placeholder="What are you working on?" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <GanttChartSquare />
          </Button>
          <Button variant="outline" size="icon">
            <Tag />
          </Button>
          <TimerActivity startAt={new Date()} />
        </div>
      </div>
    </section>
  );
};

export default TimerPage;
