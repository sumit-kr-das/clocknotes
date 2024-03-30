import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MoonIcon, SunIcon } from "lucide-react";
import * as React from "react";

const PushNotification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="items-start gap-2">
          <Mail className="w-10 h-10" />
          <div>
            <h2 className="font-semibold">Welcome!</h2>
            <p className="text-xs">
              Thank your for choosing Clocknotes. Namaste 🙏{" "}
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PushNotification;
