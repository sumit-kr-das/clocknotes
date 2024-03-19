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
export const getProjectDetails = async (id: string) => {
  try {
    const project = await db.project.findFirst({
      where: {
        id: id,
      },
    });
    return project;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await db.project.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/project");
  } catch (e) {
    console.log(e);
  }
};

export const editProject = async ({
  projectId,
  data,
}: {
  projectId: string;
  data: {
    name: string;
    client: string;
    isBillable: boolean;
    rate: number;
    currencyType: string;
    color: string;
  };
}) => {
  try {
    await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: data.name as string,
        clientId: data.client as string,
        isBillable: data.isBillable as boolean,
        rate: data.rate as number,
        currencyType: data.currencyType as string,
        color: data.color as string,
      },
    });
    revalidatePath("/project");
  } catch (e) {
    console.log(e);
  }
};
