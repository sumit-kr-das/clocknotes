import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskDropdown from "@/app/(main)/project/[id]/task/_components/TaskDropdown";
import TaskCard from "@/app/(main)/project/[id]/task/_components/task-card";
const TaskContainer = () => {
  return (
    <>
      <div className="w-full flex justify-between gap-4">
        <div className="min-w-[300px]  rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          <h1 className="text-xl font-bold px-4 py-2">Todo</h1>
          <Separator className="my-2" />
          <div className="my-3">
            <Card className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted m-3">
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="font-semibold">Make Project Component</div>
                  <div className="ml-auto text-xs flex flex-row">
                    <div className="ml-auto text-xs text-foreground">
                      5 month agos
                    </div>
                    <TaskDropdown />
                  </div>
                </div>
                <div className="text-xs font-medium">
                  Status:
                  <Badge className="ml-2">Todo</Badge>
                </div>
              </div>
              <div className="line-clamp-2 text-x5 text-muted-foreground">
                Hi, let have a meeting tomorrow to discuss the project. I haves
                been reviewing and make it fucking as you like.
              </div>
            </Card>
            <TaskCard />
          </div>
        </div>
        <div className="min-w-[300px] overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          <h1 className="text-xl font-bold px-4 py-2">Progress</h1>
          <Separator className="my-2" />
          <div className="my-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="min-w-[300px] overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          <h1 className="text-xl font-bold px-4 py-2">Done</h1>
          <Separator className="my-2" />
          <div className="my-2">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskContainer;
