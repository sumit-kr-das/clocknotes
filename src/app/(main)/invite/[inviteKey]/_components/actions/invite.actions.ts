"use server";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchTeam = async ({ teamId }: { teamId: string }) => {
  try {
    const team = await db.team.findFirst({
      where: {
        id: teamId,
      },
      include: {
        workspace: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(team);
    return team;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
