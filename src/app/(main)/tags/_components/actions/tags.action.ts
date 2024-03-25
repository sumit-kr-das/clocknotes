"use server";
import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addTags = async (data: { name: string }) => {
  try {
    const user = await getSession();
    await db.tag.create({
      data: {
        name: data.name as string,
        tenantId: user.tenantId,
      },
    });
    revalidatePath("/tags");
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const viewTags = async () => {
  try {
    const user = await getSession();
    const tags = await db.tag.findMany({
      where: {
        tenantId: user.tenantId,
      },
    });
    return tags;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const deleteTag = async (taskId: string) => {
  try {
    await db.tag.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/tags");
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const getTagDetail = async (tagId: string) => {
  try {
    const tag = await db.tag.findFirst({
      where: {
        id: tagId,
      },
    });
    return tag;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const editTag = async ({
  tagId,
  data,
}: {
  tagId: string;
  data: { name: string };
}) => {
  try {
    await db.tag.update({
      where: {
        id: tagId,
      },
      data: {
        name: data.name,
      },
    });
    revalidatePath("/tags");
  } catch (e) {
    throw new Error("Something went wrong");
  }
};
