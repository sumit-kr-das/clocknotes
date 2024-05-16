"use server";
import {
  createWorkspace,
  getUserAllWorkspaces,
  getUserWorkspaces,
  hasWorkspace,
} from "@/app/(main)/ws/actions/workspace.action";
import { redirect } from "next/navigation";
import { createTeam } from "@/app/(main)/ws/[workspaceId]/teams/_components/actions/teams.action";
import { Role } from "@prisma/client";
const Workspace = async () => {
  let redirectUrl = "";
  try {
    const check = await hasWorkspace();
    if (check === false) {
      const workspace = await createWorkspace({});
      await createTeam({
        workspaceId: workspace?.id,
        role: Role.ADMIN,
      });
      redirectUrl = `/ws/${workspace?.id}/timer`;
    } else {
      const workspaces = await getUserAllWorkspaces();
      redirectUrl = `/ws/${workspaces[0]?.workspaceId}/timer`;
    }
  } catch (e: any) {
    console.log(e.message);
  }
  redirect(redirectUrl);
};
export default Workspace;
