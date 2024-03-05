import React from "react";
import TimerNavigation from "@/app/(main)/timer/__components/timer-navigation";
import TimerSidebar from "@/app/(main)/timer/__components/timer-sidebar";

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
