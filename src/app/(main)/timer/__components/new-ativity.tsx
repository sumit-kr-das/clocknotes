"use client";
import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import "@/app/styles/play-pause-btn.css";
import { Input } from "@/components/ui/input";
import { Activity } from "@prisma/client";
import { Plus } from "lucide-react";
import { useOptimistic } from "react";
import { startActivity } from "./actions/start-activity-action";
import { stopActivity } from "./actions/stop-activity-action";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import getSession from "@/lib/get-session";

type NewActivityProps = {
  activity?: Activity | null;
};

const NewActivity = ({ activity }: NewActivityProps) => {
  const [startOptimisticActivity, addOptimisticActivity] = useOptimistic(
    activity || {
      startAt: null,
    },
    (state, newOptimisticActivity) => {
      console.log("newOptimisticActivity", newOptimisticActivity);
      console.log("state", state);
      return newOptimisticActivity;
    }
  );

  async function startAction(data: FormData) {
    const name = data.get("name") as string;
    const newStartAt = new Date();

    const createActivity = {
      startAt: newStartAt,
    };

    addOptimisticActivity(createActivity);
    console.log("    addOptimisticActivity(createActivity);");

    const result = await startActivity({ name, newStartAt });

    if (result?.error) {
      console.log({
        mag: "Error in Optimistic start",
      });
    }
  }

  async function stopAction(data: FormData) {
    const id = data.get("id") as string;

    await stopActivity(id);
  }
  console.log("start at ", startOptimisticActivity);
  if (startOptimisticActivity?.startAt) {
    console.log("start optimistic", startOptimisticActivity);
  }

  return (
    <form
      // action={activity ? stopActivity : startActivity}
      action={startOptimisticActivity?.startAt ? stopAction : startAction}
      className="w-full flex flex-col items-center bg-primary-foreground dark:bg-muted border rounded-lg py-12"
    >
      <div className="px-4 py-2 flex items-center gap-2 cursor-pointer bg-secondary rounded-lg">
        <Plus className="w-4 h-4" />
        <p className="text-sm">Select project</p>
      </div>

      <Input
        name="name"
        // defaultValue={activity?.name || ""}
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
        {startOptimisticActivity?.startAt ? (
          <TimerActivity
            // startAt={activity.startAt}
            startAt={startOptimisticActivity.startAt}
          />
        ) : (
          <p className="slashed-zero tabular-nums text-9xl">
            00:00<span className="text-gray-500">:00</span>
          </p>
        )}
      </div>
      <div className="mt-4">
        {/* {startOptimisticActivity?.startAt ? (
          <button type="submit" className={`pause-btn`}>
            <div></div>
            <div></div>
          </button>
        ) : (
          <button type="submit" className="play-btn"></button>
        )} */}

        {startOptimisticActivity?.startAt ? (
          <button type="submit" className="border border-primary">
            pause
          </button>
        ) : (
          <button type="submit" className="border border-primary">
            play
          </button>
        )}
      </div>
      {/*<Button type="submit">{activity ? "Stop" : "Start"}</Button>*/}
    </form>
  );
};

export default NewActivity;
