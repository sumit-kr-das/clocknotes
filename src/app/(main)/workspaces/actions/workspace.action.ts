import db from "@/lib/db";
import getSession from "@/lib/get-session";

export const createWorkspace = async ({ name }: { name?: string }) => {
  try {
    const user = await getSession();
    let workspaceName;
    if (!name) {
      workspaceName = user.name?.split(" ")[0] + " " + "workspace";
    } else {
      workspaceName = name;
    }
    const workspace = await db.workspace.create({
      data: {
        name: workspaceName as string,
        tenantId: user.tenantId as string,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};
