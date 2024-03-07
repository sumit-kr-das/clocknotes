import TimerActivity from "@/app/(main)/timer/__components/timer-activity";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import db from "@/lib/db";
import getSession from "@/lib/get-session";
import {Activity} from "@prisma/client";
import {GanttChartSquare, Tag} from "lucide-react";
import {revalidatePath} from "next/cache";
import {Card, CardTitle} from "@/components/ui/card";
import React from "react";
import toast from 'react-hot-toast';

type NewActivityProps = {
    activity?: Activity | null;
};

const NewActivity = ({activity}: NewActivityProps) => {
    const startActivity = async (data: FormData) => {
        "use server";
        const user = await getSession();
        await db.activity.create({
            data: {
                user: {connect: {id: user.id}},
                tenant: {connect: {id: user.tenantId}},
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
            className="w-full flex items-center justify-between gap-4 border p-4 bg-accent rounded-md"
        >
            <Input
                name="name"
                defaultValue={activity?.name || ""}
                className="w-[70%] block"
                type="text"
                placeholder="What are you working on?"
            />
            <Input
                name="id"
                defaultValue={activity?.id || ""}
                className="w-[100%] block"
                type="hidden"
            />
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                    <GanttChartSquare/>
                </Button>
                <Button variant="outline" size="icon">
                    <Tag/>
                </Button>
                <div>{activity ? <TimerActivity startAt={activity.startAt}/> :
                    <div className="slashed-zero tabular-nums text-lg font-bold">
                        00 : 00 : 00
                    </div>
                }</div>
                <Button type="submit">{activity ? "Stop" : "Start"}</Button>
            </div>
        </form>
    );
};

type DailyActivitiesProp = {
    activities: Activity[]
}
const DailyActivities = ({activities}: DailyActivitiesProp) => {
    return (
        <div className="mt-10">
            {
                activities?.map(activity => (
                    <Card key={activity.id} className="p-5 mt-4">
                        <CardTitle>
                            {activity.name}
                        </CardTitle>
                    </Card>
                ))
            }
        </div>
    )
};

const TimerPage = async () => {
    const user = await getSession();

    const currentActivity = await db.activity.findFirst({
        where: {
            tenantId: user.tenantId,
            userId: user.id,
            endAt: null,
        },
    });

    const dailyActivities = await db.activity.findMany({
        where: {
            tenantId: user.tenantId,
            userId: user.id,
            endAt: {
                not: null
            }
        }
    })

    return (
        <section className="w-full">
            <NewActivity activity={currentActivity}/>
            <DailyActivities activities={dailyActivities}/>
        </section>
    );
};

export default TimerPage;
