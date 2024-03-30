"use client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleUser,
  ClipboardMinus,
  Clock,
  GanttChartSquare,
  Plus,
  Settings2,
  Tags,
  Users2,
} from "lucide-react";
import React from "react";
import Nav from "@/components/global/nav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import OnlyLogo from "@/assets/only-logo.svg";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TimerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "relative border-r pb-10 pt-4 px-2 bg-[#121621]",
        isCollapsed ? "min-w-[80px]" : "min-w-[300px]",
      )}
    >
      <div className="absolute -right-[20px] top-7">
        <Button
          className="rounded-full p-2"
          onClick={toggleSidebar}
          variant={"default"}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Link
        href={"/timer"}
        className={cn(
          "p-4 flex items-center gap-2",
          isCollapsed && "justify-center",
        )}
      >
        <Image src={Logo} width={40} height={40} alt="logo" />
        {!isCollapsed && (
          <h1 className="text-white font-bold text-2xl">Clocknotes</h1>
        )}
      </Link>
      <div className="mx-4 mt-2 mb-6 text-white rounded-lg p-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <Image src={OnlyLogo} width={40} height={40} alt="logo" />
              </div>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-[#8a94a6] text-sm">Workspace</p>
                  <p className="text-sm font-semibold">Sumit's</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div>
                <ChevronsUpDown className="w-5 h-5" />
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[240px]">
            <DropdownMenuItem className="cursor-pointer">
              <div className="text-left">
                <p className="text-[#8a94a6] text-sm">Default</p>
                <p className="text-sm font-semibold">Sumit's workspace</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="text-left">
                <p className="text-[#8a94a6] text-sm">Production</p>
                <p className="text-sm font-semibold">Sk's workspace</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="default" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Workspace
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        label={"Dashboards"}
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
      <Nav
        isCollapsed={isCollapsed}
        label={"General"}
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
      <Nav
        isCollapsed={isCollapsed}
        label={"Others"}
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
