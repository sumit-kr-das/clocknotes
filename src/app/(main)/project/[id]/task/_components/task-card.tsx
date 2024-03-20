import { Card } from "@/components/ui/card";
import TaskDropdown from "@/app/(main)/project/[id]/task/_components/TaskDropdown";
import { Badge } from "@/components/ui/badge";

const TaskCard = () => {
  return (
    <Card className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted m-3">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="font-semibold">Make Project Component</div>
          <div className="ml-auto text-xs flex flex-row">
            <div className="ml-auto text-xs text-foreground">5 month agos</div>
            <TaskDropdown />
          </div>
        </div>
        <div className="text-xs font-medium">
          Status:
          <Badge className="ml-2">Todo</Badge>
        </div>
      </div>
      <div className="line-clamp-2 text-x5 text-muted-foreground">
        Hi, let have a meeting tomorrow to discuss the project. I haves been
        reviewing and make it fucking as you like.
      </div>
    </Card>
  );
};
export default TaskCard;
