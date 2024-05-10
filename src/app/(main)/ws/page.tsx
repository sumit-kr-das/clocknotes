"use server";
import {
  createWorkspace,
  getUserAllWorkspaces,
  hasWorkspace,
} from "@/app/(main)/ws/actions/workspace.action";
import { redirect } from "next/navigation";
const Workspace = async () => {
  let redirectUrl = "";
  try {
    const check = await hasWorkspace();
    if (check === false) {
      const workspace = await createWorkspace({});
      redirectUrl = `/ws/${workspace?.id}/timer`;
    } else {
      const workspaces = await getUserAllWorkspaces();
      redirectUrl = `/ws/${workspaces[0]?.id}/timer`;
    }
  } catch (e: any) {
    console.log(e.message);
  }
  redirect(redirectUrl);
};
export default Workspace;
