"use client";
import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import AddTimerProject from "@/app/(main)/timer/__components/timer-add-project";
import AddTags from "@/app/(main)/timer/__components/timer-add-tags";
import Billable from "@/app/(main)/timer/__components/timer-billable";
import "@/app/styles/play-pause-btn.css";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Activity } from "@prisma/client";
import { Inter } from "next/font/google";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { startActivity } from "./actions/start-activity-action";
import { stopActivity } from "./actions/stop-activity-action";

const inter = Inter({ subsets: ["latin"] });

type NewActivityProps = {
  activity?: Activity | null;
};

const NewActivity = ({ activity }: NewActivityProps) => {
  const [startOptimisticActivity, addOptimisticActivity] = useOptimistic(
    activity || {
      id: null,
      startAt: null,
    },
    (state, newOptimisticActivity: any) => {
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
    const result = await startActivity({ name, newStartAt });
    if (result?.error) {
      toast.error(result?.error);
    }
  }

  async function stopAction(data: FormData) {
    const id = data.get("id") as string;
    await stopActivity(id);
  }

  return (
    <TooltipProvider>
      <form
        action={startOptimisticActivity?.startAt ? stopAction : startAction}
        className="w-full flex items-center gap-8 bg-primary-foreground dark:bg-muted border rounded-lg p-8"
      >
        <Input
          name="name"
          className="w-full block"
          type="text"
          placeholder="What are you working on?"
        />
        <Input
          name="id"
          defaultValue={activity?.id || ""}
          className="w-[100%] block"
          type="hidden"
        />
        <AddTimerProject />
        <AddTags />
        <Billable />
        <div>
          {startOptimisticActivity?.startAt ? (
            <TimerActivity startAt={startOptimisticActivity.startAt} />
          ) : (
            <p
              className={cn(
                "slashed-zero tabular-nums font-bold text-2xl",
                inter.className
              )}
            >
              00:00<span className="text-gray-500">:00</span>
            </p>
          )}
        </div>
        <div>
          {startOptimisticActivity?.startAt && (
            <>
              {startOptimisticActivity?.id ? (
                <button type="submit" className={`pause-btn`}>
                  <div></div>
                  <div></div>
                </button>
              ) : (
                <button type="button" className={`pause-btn-disable`}>
                  <div></div>
                  <div></div>
                </button>
              )}
            </>
          )}

          {!startOptimisticActivity?.startAt && (
            <button type="submit" className="play-btn"></button>
          )}
        </div>
      </form>
    </TooltipProvider>
  );
};

export default NewActivity;
