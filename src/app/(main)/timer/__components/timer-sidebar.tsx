"use client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  ClipboardMinus,
  Clock,
  GanttChartSquare,
  Settings2,
  Tags,
  Users2,
} from "lucide-react";
import React from "react";
import Nav from "../../../../components/global/nav";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const TimerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "relative border-r px-3 pb-10 pt-24",
        isCollapsed ? "min-w-[80px]" : "min-w-[240px]",
      )}
    >
      <div className="absolute -right-[20px] top-7">
        <Button
          className="rounded-full p-2"
          onClick={toggleSidebar}
          variant={"secondary"}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Timer",
            label: "",
            icon: Clock,
            variant: "default",
            href: "/timer",
          },
          {
            title: "Calender",
            label: "",
            icon: Calendar,
            variant: "ghost",
            href: "/calender",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Reports",
            label: "",
            icon: ClipboardMinus,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Clients",
            label: "",
            icon: CircleUser,
            variant: "ghost",
            href: "/client",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Team",
            label: "",
            icon: Users2,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Projects",
            label: "",
            icon: GanttChartSquare,
            variant: "ghost",
            href: "/project",
          },
          {
            title: "Tags",
            label: "",
            icon: Tags,
            variant: "ghost",
            href: "/tags",
          },
          {
            title: "Settings",
            label: "",
            icon: Settings2,
            variant: "ghost",
            href: "/",
          },
        ]}
      />
    </div>
  );
};

export default TimerSidebar;
