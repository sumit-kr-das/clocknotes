"use client";
import TimerActivity from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-activity";
import "@/app/styles/play-pause-btn.css";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Activity, Project } from "@prisma/client";
import { Inter } from "next/font/google";
import { useOptimistic, useRef, useState } from "react";
import toast from "react-hot-toast";
import { startActivity } from "./actions/start-activity-action";
import { stopActivity } from "./actions/stop-activity-action";
import AddTimerProject from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-add-project";
import AddTags from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-add-tags";
import Billable from "@/app/(main)/ws/[workspaceId]/timer/__components/timer-billable";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type NewActivityProps = {
  activity?: Activity | null;
  projects?: Project[];
};

export type TimerStates = {
  projectName?: string;
  projectId?: string;
  tags?: string;
  isBillable?: boolean;
};

const INITIAL_TIMER_STATE = {
  projectName: "",
  projectId: "",
  tags: "",
  isBillable: false,
};

const NewActivity = ({ activity, projects }: NewActivityProps) => {
  const [timerStates, setTimerStates] =
    useState<TimerStates>(INITIAL_TIMER_STATE);
  const ref = useRef<HTMLFormElement>(null);
  const params = useParams<{ workspaceId: string }>();

  const handleTimerStates = (props: TimerStates) => {
    setTimerStates({
      ...timerStates,
      ...props,
    });
  };
  console.log("project is", timerStates.projectId);

  const [startOptimisticActivity, addOptimisticActivity] = useOptimistic(
    activity || {
      id: null,
      startAt: null,
    },
    (state, newOptimisticActivity: any) => {
      return newOptimisticActivity;
    },
  );

  async function startAction(data: FormData) {
    const name = data.get("name") as string;
    const project = data.get("project") as string;
    console.log("project is", project);
    const newStartAt = new Date();
    const createActivity = {
      startAt: newStartAt,
    };

    addOptimisticActivity(createActivity);
    const result = await startActivity({
      name,
      newStartAt,
      projectId: timerStates.projectId || "",
      billable: timerStates.isBillable || false,
      workspaceId: params.workspaceId,
    });
    if (result?.error) {
      toast.error(result?.error);
    }
  }

  async function stopAction(data: FormData) {
    const id = data.get("id") as string;
    await stopActivity(id);
    ref.current?.reset();
    setTimerStates(INITIAL_TIMER_STATE);
  }

  return (
    <TooltipProvider>
      <form
        ref={ref}
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
        <AddTimerProject
          projects={projects}
          timerStates={timerStates}
          handleTimerStates={handleTimerStates}
        />
        <AddTags />
        <Billable
          timerStates={timerStates}
          handleTimerStates={handleTimerStates}
        />
        <div>
          {startOptimisticActivity?.startAt ? (
            <TimerActivity startAt={startOptimisticActivity.startAt} />
          ) : (
            <p
              className={cn(
                "slashed-zero tabular-nums font-bold text-2xl",
                inter.className,
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
