import React from "react";
import TimerNavigation from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-navigation";
import TimerSidebar from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-sidebar";
import getSession from "@/lib/get-session";
import {
  getUserAllWorkspaces,
  getWorkspaceById,
} from "@/app/(main)/ws/actions/workspace.action";

const MainLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) => {
  const user = await getSession();
  const workspace = await getWorkspaceById({ id: params.workspaceId });
  const workspaces = await getUserAllWorkspaces();
  return (
    <main className="min-h-screen w-full flex">
      {/* sidebar */}
      <TimerSidebar
        userName={user?.name || "Default"}
        workspaceName={workspace?.name}
        workspaces={workspaces}
      />
      {/* main */}
      <div className="w-full">
        <TimerNavigation />
        <div className="p-8">{children}</div>
      </div>
    </main>
  );
};

export default MainLayout;
