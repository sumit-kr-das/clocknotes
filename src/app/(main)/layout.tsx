import React from "react";
import TimerNavigation from "@/components/timer/timer-navigation";
import TimerSidebar from "@/components/timer/timer-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex">
      {/* sidebar */}
      <TimerSidebar />
      {/* main */}
      <div className="w-full">
        <TimerNavigation />
        <div className="p-8">{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
