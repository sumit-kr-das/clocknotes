import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { Activity } from "@prisma/client";
import { GanttChartSquare, Tag } from "lucide-react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type NewActivityProps = {
  activity?: Activity | null;
};

const NewActivity = ({ activity }: NewActivityProps) => {
  const createActivity = async (data: FormData) => {
    "use server";
    const user = await getSession();
    const activity = await db.activity.create({
      data: {
        user: { connect: { id: user.id } },
        tenant: { connect: { id: user.tenantId } },
        name: data.get("name") as string,
        startAt: new Date(),
      },
    });
    revalidatePath("/timer");
  };

  return (
    <form
      action={createActivity}
      className="w-full flex items-center justidy-between gap-4 border p-4 bg-accent rounded-md"
    >
      <Input
        name="name"
        defaultValue={activity?.name || ""}
        className="w-[70%] block"
        type="text"
        placeholder="What are you working on?"
      />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <GanttChartSquare />
        </Button>
        <Button variant="outline" size="icon">
          <Tag />
        </Button>
        <div>{activity && <TimerActivity startAt={activity.startAt} />}</div>
        <Button type="submit">Start</Button>
      </div>
    </form>
  );
};
const DailyActivities = () => {};

const TimerPage = async () => {
  const user = await getSession();
  console.log(user);

  const currentActivity = await db.activity.findFirst({
    where: {
      tenantId: user.tenantId,
      userId: user.id,
      endAt: null,
    },
  });

  return (
    <section className="w-full">
      <NewActivity activity={currentActivity} />
    </section>
  );
};

export default TimerPage;
