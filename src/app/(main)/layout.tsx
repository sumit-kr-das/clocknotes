import React from "react";
import TimerNavigation from "@/app/(main)/timer/__components/timer-navigation";
import TimerSidebar from "@/app/(main)/timer/__components/timer-sidebar";
import getSession from "@/lib/get-session";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSession();
  return (
    <main className="min-h-screen w-full flex">
      {/* sidebar */}
      <TimerSidebar userName={user?.name || "Default"} />
      {/* main */}
      <div className="w-full">
        <TimerNavigation />
        <div className="p-8">{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
