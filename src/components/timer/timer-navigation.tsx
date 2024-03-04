import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Expand, Settings } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import ToggleFullScreen from "../global/toggle-fullscreen";

const TimerNavigation = () => {
  return (
    <nav className="py-4 px-8 flex items-center justify-between border-b">
      <div>
        <Image src={Logo} width={120} height={60} alt="logo" />
      </div>
      <div className="flex items-center gap-4">
        <ToggleFullScreen />
        <div className="flex items-center justify-center gap-2 rounded-full py-1 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Settings className="w-5 h-5" />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default TimerNavigation;
