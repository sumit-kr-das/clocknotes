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
        workspaceId: workspaceId,
      },
    });
    await trainsporter.sendMail({
      from: '"Clocknotes" <support@clocknotes.cloud>', // sender address
      to: `${email}`, // list of receivers
      subject: "Your Clocknotes Subscription Is Successfull ✔", // Subject line
      text: "Your subscription for clocknotes is successfull. ", // plain text body
      html: `<b>Hello</b>
<br/>
<p>${user.name} is inviting you for joining their team. If you want to join please click on the following link.</p>
<a href="http://localhost:3000/ws?invite="${newMember?.id}/> 
`, // html body
    });
    revalidatePath("/teams");
  } catch (e: any) {
    throw new Error(e.message);
  }
};
