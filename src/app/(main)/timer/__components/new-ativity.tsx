import { Activity } from "@prisma/client";
import getSession from "@/lib/get-session";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GanttChartSquare, Plus, Tag } from "lucide-react";
import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import React from "react";
import "@/app/styles/play-pause-btn.css";

type NewActivityProps = {
  activity?: Activity | null;
};

const NewActivity = ({ activity }: NewActivityProps) => {
  const startActivity = async (data: FormData) => {
    "use server";
    const user = await getSession();
    await db.activity.create({
      data: {
        user: { connect: { id: user.id } },
        tenant: { connect: { id: user.tenantId } },
        name: data.get("name") as string,
        startAt: new Date(),
      },
    });
    revalidatePath("/timer");
  };
  const stopActivity = async (data: FormData) => {
    "use server";
    await db.activity.update({
      where: {
        id: data.get("id") as string,
      },
      data: {
        endAt: new Date(),
      },
    });
    revalidatePath("/timer");
  };
  return (
    <form
      action={activity ? stopActivity : startActivity}
      className="w-full flex flex-col items-center bg-primary-foreground dark:bg-muted border rounded-lg py-12"
    >
      <div className="px-4 py-2 flex items-center gap-2 cursor-pointer bg-secondary rounded-lg">
        <Plus className="w-4 h-4" />
        <p className="text-sm">Select project</p>
      </div>

      <Input
        name="name"
        defaultValue={activity?.name || ""}
        className="w-[70%] block mt-4"
        type="text"
        placeholder="What are you working on?"
      />
      <Input
        name="id"
        defaultValue={activity?.id || ""}
        className="w-[100%] block"
        type="hidden"
      />

      <div className="my-6">
        {activity ? (
          <TimerActivity startAt={activity.startAt} />
        ) : (
          <p className="slashed-zero tabular-nums text-9xl">
            00:00<span className="text-gray-500">:00</span>
          </p>
        )}
      </div>
      <div className="mt-4">
        {activity ? (
          <button type="submit" className={`pause-btn`}>
            <div></div>
            <div></div>
          </button>
        ) : (
          <button type="submit" className="play-btn"></button>
        )}
      </div>
      {/*<Button type="submit">{activity ? "Stop" : "Start"}</Button>*/}
    </form>
  );
};

export default NewActivity;
