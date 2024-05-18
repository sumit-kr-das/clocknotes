"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import getSession from "@/lib/get-session";

interface EditClientParams {
  data: {
    name: string;
    email: string | null;
    address: string | null;
    note: string | null;
    currency: string | null;
  };
  path: string;
  clientId: string;
}
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
    const clients = await db.client.findMany({
      where: {
        tenantId: user.tenantId,
      },
    });
    return clients;
  } catch (e) {
    console.log(e);
  }
};

export const getClientDetail = async (id: string) => {
  try {
    const response = await db.client.findFirst({
      where: {
        id: id,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const editClient = async ({
  data,
  path,
  clientId,
}: EditClientParams) => {
  try {
    await db.client.update({
      where: {
        id: clientId,
      },
      data: {
        name: data.name as string,
        email: data.email as string | null,
        note: data.note as string | null,
        currency: data.currency as string,
        address: data.address as string | null,
      },
    });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
};

export const deleteClient = async (id: string) => {
  try {
    await db.client.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/client");
  } catch (e) {
    console.log(e);
  }
};
