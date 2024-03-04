import TimerNavigation from "@/components/timer/timer-navigation";
import TimerSidebar from "@/components/timer/timer-sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <TimerNavigation />
      <TimerSidebar />
      {children}
    </main>
  );
};

export default MainLayout;
