"use server";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { Role } from "@prisma/client";
import trainsporter from "@/lib/trainsporter";
import { revalidatePath } from "next/cache";

export const createTeam = async ({
  workspaceId,
  role,
}: {
  workspaceId: string;
  role?: Role;
}) => {
  try {
    const user = await getSession();
    await db.team.create({
      data: {
        workspaceId: workspaceId as string,
        role: role as Role,
        tenantId: user.tenantId,
        userId: user.id,
        email: user.email,
        isJoined: true,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getTeams = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    console.log(workspaceId, "workspace id");
    const teams = await db.team.findMany({
      where: {
        workspaceId: workspaceId,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    return teams;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const sendTeamInvitation = async ({
  email,
  workspaceId,
}: {
  email: string;
  workspaceId: string;
}) => {
  try {
    const user = await getSession();
    const newMember = await db.team.create({
      data: {
        email: email as string,
        workspaceId: workspaceId as string,
      },
    });
    console.log(newMember?.id, "new member id");
    await trainsporter.sendMail({
      from: '"Clocknotes" <support@clocknotes.cloud>', // sender address
      to: `${email}`, // list of receivers
      subject: `${user.name} is inviting you to join their team in Clocknotes ✔`, // Subject line
      text: `${user.name} is inviting you to join their team in Clocknotes ✔ `, // plain text body
      html: `<b>Hello</b>
    <br/>
    <p>${user.name} is inviting you for joining their team. If you want to join please click on the following link.</p>
    <a href='http://localhost:3000/invite/${newMember?.id}'>Join Team</a>
    `, // html body
    });
    revalidatePath("/teams");
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const addMemberByInvite = async ({ teamId }: { teamId: string }) => {
  try {
    const user = await getSession();
    const team = await db.team.update({
      where: {
        id: teamId,
      },
      data: {
        userId: user.id as string,
        tenantId: user.tenantId as string,
      },
    });
    return team;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const viewTeam = async ({ id }: { id: string }) => {
  try {
    const teamDetails = await db.team.findFirst({
      where: {
        id: id,
      },
    });
    return teamDetails;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
