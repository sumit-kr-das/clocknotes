import db from "@/lib/db";
import getSession from "@/lib/get-session";

export const createWorkspace = async ({ name }: { name: string }) => {
  try {
    const user = await getSession();
    const workspace = await db.workspace.create({
      data: {
        name: name as string,
        tenantId: user.tenantId as string,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};

export const createWorkspaceOnSignIn = async (email?: string | null) => {
  console.log(email, "userId");
  try {
    const user = await db.user.findFirst({
      where: {
        email: email || "",
      },
    });
    console.log(user, "user");

    const workspace = await db.workspace.create({
      data: {
        name: user?.name?.split(" ")[0] + " " + "workspace",
        tenantId: user?.tenantId as string,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};

export const hasWorkspace = async (email?: string | null) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email || "",
      },
    });

    const workspaces = await db.workspace.findFirst({
      where: {
        tenantId: user?.tenantId,
      },
    });
    if (workspaces) return true;
    return false;
  } catch (e: any) {
    throw new Error(e.message);
    return false;
  }
};

export const getWorkspace = async (email?: string | null) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email || "",
      },
    });

    const workspace = await db.workspace.findFirst({
      where: {
        tenantId: user?.tenantId,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error(e.message);
    return false;
  }
};

export const getUserAllWorkspaces = async (tenantId: string) => {
  try {
    const workspaces = await db.workspace.findMany({
      where: {
        tenantId: tenantId,
      },
    });
    return workspaces;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
