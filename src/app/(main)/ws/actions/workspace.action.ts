"use server";
import db from "@/lib/db";
import getSession from "@/lib/get-session";

export const createWorkspace = async ({
  name,
  type,
}: {
  name?: string;
  type?: string;
}) => {
  try {
    const user = await getSession();
    const workspace = await db.workspace.create({
      data: {
        name: (name as string) || user?.name?.split(" ")[0] + " " + "workspace",
        tenantId: user.tenantId as string,
        type: type as string,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error("something went wrong");
  }
};

// export const createWorkspaceOnSignIn = async (email?: string | null) => {
//   console.log(email, "userId");
//   try {
//     const user = await db.user.findFirst({
//       where: {
//         email: email || "",
//       },
//     });
//     console.log(user, "user");
//
//     const workspace = await db.workspace.create({
//       data: {
//         name: user?.name?.split(" ")[0] + " " + "workspace",
//         tenantId: user?.tenantId as string,
//       },
//     });
//     return workspace;
//   } catch (e: any) {
//     throw new Error(e?.message);
//   }
// };

export const hasWorkspace = async () => {
  try {
    const user = await getSession();
    const workspace = await db.workspace.findFirst({
      where: {
        tenantId: user.tenantId,
      },
    });
    if (!workspace) {
      return false;
    }
    return true;
  } catch (e: any) {
    throw new Error("something went wrong");
  }
};
export const getUserAllWorkspaces = async () => {
  try {
    const user = await getSession();
    const workspaces = await db.workspace.findMany({
      where: {
        tenantId: user.tenantId,
      },
    });
    return workspaces;
  } catch (e: any) {
    throw new Error("something went wrong");
  }
};

export const getWorkspaceById = async ({ id }: { id: string }) => {
  console.log(id);
  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id: id,
      },
    });
    return workspace;
  } catch (e: any) {
    throw new Error("something went wrong");
  }
};
