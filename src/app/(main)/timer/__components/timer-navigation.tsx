import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Expand, Settings } from "lucide-react";
import { ModeToggle } from "../../../../components/global/mode-toggle";
import ToggleFullScreen from "../../../../components/global/toggle-fullscreen";
import { TooltipProvider } from "../../../../components/ui/tooltip";
import UserNav from "@/app/(main)/timer/__components/user-nav";

const TimerNavigation = () => {
  return (
    <nav className="py-4 px-8 flex items-center justify-between border-b bg-white dark:bg-inherit">
      <div>
        <Image src={Logo} width={120} height={60} alt="logo" />
      </div>
      <TooltipProvider>
        <div className="flex items-center gap-4">
          <ToggleFullScreen />
          <ModeToggle />
          <UserNav />
        </div>
      </TooltipProvider>
    </nav>
  );
};

export default TimerNavigation;
