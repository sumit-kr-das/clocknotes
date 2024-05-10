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
import React, { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import { TWorkspace } from "@/type/workspace/TWorkspace";
import AddWorkspace from "@/app/(main)/ws/_components/add-workspace";
import { useRouter } from "next/navigation";

const TimerSidebar = ({
  userName,
  workspaceName,
  workspaces,
}: {
  userName: string;
  workspaceName?: string;
  workspaces: TWorkspace[];
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleRedirect = (wId: string) => {
    router.push(`/ws/${wId}/timer`);
  };

  return (
    <div
      className={cn(
        "relative border-r pb-10 pt-4 px-2 bg-[#121621]",
        isCollapsed ? "min-w-[80px]" : "min-w-[300px]",
      )}
    >
      <AddWorkspace open={open} setOpen={setOpen} />
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
                  <p className="text-sm font-semibold">
                    {/*{userName?.split(" ")[0]}*/}
                    {workspaceName}
                  </p>
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
            {workspaces?.map((ws) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={ws?.id}
                onClick={() => handleRedirect(ws?.id)}
              >
                <div className="text-left">
                  <p className="text-[#8a94a6] text-sm">{ws?.type}</p>
                  <p className="text-sm font-semibold">{ws?.name}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <Button
                variant="default"
                className="w-full"
                onClick={() => setOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Workspace
              </Button>
              {/*<AddWorkspace />*/}
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
            href: `/ws/${workspaceId}/timer`,
          },
          {
            title: "Calender",
            label: "",
            icon: Calendar,
            variant: "ghost",
            href: `/ws/${workspaceId}/calender`,
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
            href: `/ws/${workspaceId}/timer`,
          },
          {
            title: "Clients",
            label: "",
            icon: CircleUser,
            variant: "ghost",
            href: `/ws/${workspaceId}/client`,
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
            href: `/ws/${workspaceId}/project`,
          },
          {
            title: "Tags",
            label: "",
            icon: Tags,
            variant: "ghost",
            href: `/ws/${workspaceId}/tags`,
          },
          {
            title: "Settings",
            label: "",
            icon: Settings2,
            variant: "ghost",
            href: `/ws/${workspaceId}/timer`,
          },
        ]}
      />
    </div>
  );
};

export default TimerSidebar;
