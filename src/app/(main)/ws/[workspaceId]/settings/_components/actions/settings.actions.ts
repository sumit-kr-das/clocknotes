"use server";
import db from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getWorkspaceSettings = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const settingsData = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        companyLogo: true,
        currency: true,
        defaultRate: true,
        projectPermission: true,
        clientPermission: true,
        tagPermission: true,
        timeSheetPermission: true,
        billingPermission: true,
      },
    });
    return settingsData;
  } catch (e: any) {
    throw new Error(e?.message);
  }
};

export const updateWorkspaceSetting = async ({
  id,
  name,
  companyName,
  companyLogo,
  currency,
  defaultRate,
  projectPermission,
  clientPermission,
  tagPermission,
  timeSheetPermission,
  billingPermission,
}: {
  id: string;
  name?: string;
  companyName?: string;
  companyLogo?: string;
  currency?: string;
  defaultRate?: string;
  projectPermission?: Role;
  clientPermission?: Role;
  tagPermission?: Role;
  timeSheetPermission?: Role;
  billingPermission?: Role;
}) => {
  try {
    const updateSettings = await db.workspace.update({
      where: {
        id: id,
      },
      data: {
        name,
        companyName,
        companyLogo,
        currency,
        defaultRate: Number(defaultRate),
        projectPermission,
        clientPermission,
        tagPermission,
        billingPermission,
        timeSheetPermission,
      },
    });
    revalidatePath(`/ws/${id}/settings`);
  } catch (e: any) {
    throw new Error(e?.message);
  }
};
