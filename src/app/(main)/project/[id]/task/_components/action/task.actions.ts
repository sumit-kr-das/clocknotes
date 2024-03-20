"use server";
import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
export const addTask = async ({
  data,
  projectId,
}: {
  data: {
    name: string;
    description: string;
  };
  projectId: any;
}) => {
  try {
    const user = await getSession();
    await db.task.create({
      data: {
        name: data.name as string,
        description: data.description as string,
        tenant: { connect: { id: user.id } },
        project: { connect: { id: projectId } },
      },
    });
    revalidatePath(`/project/${projectId}/task`);
  } catch (e) {
    throw new Error("Failed to create task");
  }
};
