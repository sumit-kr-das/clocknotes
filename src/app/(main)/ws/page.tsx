"use server";
import {
  createWorkspace,
  getUserAllWorkspaces,
  getUserWorkspaces,
  hasWorkspace,
} from "@/app/(main)/ws/actions/workspace.action";
import { redirect } from "next/navigation";
import {
  addMemberByInvite,
  createTeam,
  viewTeam,
} from "@/app/(main)/ws/[workspaceId]/teams/_components/actions/teams.action";
import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import getSession from "@/lib/get-session";

const Workspace = async () => {
  let redirectUrl = "";
  try {
    const check = await hasWorkspace();
    const cookieStore = cookies();
    const inviteKey = cookieStore.get("teamId");
    const team = await viewTeam({ id: inviteKey?.value || "" });
    const user = await getSession();
    if (inviteKey && team?.email === user?.email) {
      const team = await addMemberByInvite({ teamId: inviteKey.value });
      redirectUrl = `/ws/${team?.workspaceId}/timer`;
    } else {
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
    }
    if (inviteKey) {
      cookies().delete("teamId");
    }
  } catch (e: any) {
    console.log(e.message);
  }
  redirect(redirectUrl);
};
export default Workspace;
