import {
  createWorkspace,
  getUserAllWorkspaces,
  hasWorkspace,
} from "@/app/(main)/ws/actions/workspace.action";
import { redirect } from "next/navigation";
const Workspace = async () => {
  try {
    const check = await hasWorkspace();
    if (check === false) {
      const workspace = await createWorkspace({});
      redirect(`/ws/${workspace?.id}/timer`);
    } else {
      const workspaces = await getUserAllWorkspaces();
      redirect(`/ws/${workspaces[0]?.id}/timer`);
    }
  } catch (e: any) {
    console.log(e.message);
  }
};
export default Workspace;
