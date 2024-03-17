"use server";

import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addProject = async ({
  data,
  path,
}: {
  data: {
    name: string;
    client: string | undefined;
  };
  path: string;
}) => {
  const user = await getSession();
  try {
    await db.project.create({
      data: {
        tenant: { connect: { id: user.tenantId } },
        client: data.client ? { connect: { id: data.client } } : undefined,
        name: data.name as string,
      },
    });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
};
export const getProject = async () => {
  try {
    const user = await getSession();
    const projects = await db.project.findMany({
      where: {
        tenantId: user.tenantId,
      },
      include: {
        client: true,
      },
    });
    return projects;
  } catch (e) {
    console.log(e);
  }
};
