"use server";
import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { throws } from "node:assert";
import TTask from "@/type/task/task";
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
    const lastTask = await db.task.findFirst({
      where: {
        status: "Todo",
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastTask ? lastTask.order + 1 : 1;

    await db.task.create({
      data: {
        tenant: { connect: { id: user.tenantId } },
        project: { connect: { id: projectId } },
        name: data.name as string,
        order: newOrder,
        description: data.description as string,
      },
    });
    revalidatePath(`/project/${projectId}/task`);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to add task");
  }
};

export const getTasks = async (projectId: any) => {
  try {
    const todoTasks = await db.task.findMany({
      where: {
        projectId: projectId,
        status: "Todo",
      },
    });
    const progressTasks = await db.task.findMany({
      where: {
        projectId: projectId,
        status: "Progress",
      },
    });
    const doneTasks = await db.task.findMany({
      where: {
        projectId: projectId,
        status: "Done",
      },
    });

    return [
      {
        status: "Todo",
        data: todoTasks,
      },
      {
        status: "Progress",
        data: progressTasks,
      },
      {
        status: "Done",
        data: doneTasks,
      },
    ];
  } catch (e) {
    throw new Error("Failed in getting task");
  }
};

export const editTaskStatus = async ({
  taskId,
  status,
}: {
  taskId: string;
  status: string;
}) => {
  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
      },
    });
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const taskUpdate = async ({
  taskId,
  projectId,
  data,
}: {
  taskId: string;
  projectId: any;
  data: {
    name: string;
    description: string;
  };
}) => {
  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    revalidatePath(`/project/${projectId}/task`);
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const deleteTask = async ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: any;
}) => {
  try {
    await db.task.delete({
      where: {
        id: taskId,
        projectId: projectId,
      },
    });
    revalidatePath(`/project/${projectId}/task`);
  } catch (e) {
    throw new Error("Something went wrong");
  }
};
