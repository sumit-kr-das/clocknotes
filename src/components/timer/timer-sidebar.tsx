"use client";
import React from "react";
import TimerNav from "./timer-nav";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  ChevronLeft,
  ChevronRight,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TimerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "relative  border-r px-3 pb-10 pt-24",
        isCollapsed ? "min-w-[80px]" : "min-w-[240px]"
      )}
    >
      <div className="absolute -right-[20px] top-7">
        <Button
          className="rounded-full p-2"
          variant="secondary"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <TimerNav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Timer",
            label: "128",
            icon: Inbox,
            variant: "default",
            href: "/timer",
          },
          {
            title: "Calender",
            label: "9",
            icon: File,
            variant: "ghost",
            href: "/calender",
          },
          {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
            href: "/",
          },
        ]}
      />
      <Separator />
      <TimerNav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
            href: "/",
          },
          {
            title: "Promotions",
            label: "21",
            icon: Archive,
            variant: "ghost",
            href: "/",
          },
        ]}
      />
    </div>
  );
};

export default TimerSidebar;
