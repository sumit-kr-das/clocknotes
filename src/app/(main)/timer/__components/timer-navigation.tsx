import React from "react";
import { ModeToggle } from "@/components/global/mode-toggle";
import ToggleFullScreen from "@/components/global/toggle-fullscreen";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserNav from "@/app/(main)/timer/__components/user-nav";
import CrownIcn from "@/assets/icon/crown.svg";
import Image from "next/image";
import OnlyLogo from "@/assets/only-logo.svg";
import Link from "next/link";
import PushNotification from "@/components/global/push-notification";

const TimerNavigation = () => {
  return (
    <nav className="py-4 px-8 h-20 flex items-center justify-between border-b bg-white dark:bg-inherit">
      <div>{/*<Image src={Logo} width={120} height={60} alt="logo" />*/}</div>
      <TooltipProvider>
        <div className="flex items-center gap-4">
          <Link
            href={"/timer"}
            className="bg-[#FEF5EA] flex items-center gap-2 py-2 px-4 rounded-sm"
          >
            <Image src={CrownIcn} width={20} height={20} alt="crown logo" />
            <p className="text-[#f29a2e] text-sm">Unlocked</p>
          </Link>
          <ToggleFullScreen />
          <PushNotification />
          <ModeToggle />
          <UserNav />
        </div>
      </TooltipProvider>
    </nav>
  );
};

export default TimerNavigation;
