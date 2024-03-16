"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import getSession from "@/lib/get-session";
export const addClient = async ({
  data,
  path,
}: {
  data: {
    name: string;
  };
  path: string;
}) => {
  const user = await getSession();
  try {
    await db.client.create({
      data: {
        tenant: { connect: { id: user.tenantId } },
        name: data.name as string,
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getClients = async () => {
  const user = await getSession();
  try {
    const clients = await prisma?.client.findMany({
      where: {
        tenantId: user.tenantId,
      },
    });
    return clients;
  } catch (e) {
    console.log(e);
  }
};
