import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { Role } from "@prisma/client";

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
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getTeams = async ({ workspaceId }: { workspaceId: string }) => {
  try {
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
    console.log(teams);
    return teams;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const sendTeamInvitation({email}:{email:string}){
  try {

  }catch (e:any) {
    throw new Error(e.message);
  }
}
