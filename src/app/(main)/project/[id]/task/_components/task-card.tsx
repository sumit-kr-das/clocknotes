import TaskDropdown from "@/app/(main)/project/[id]/task/_components/TaskDropdown";
import { convertDate } from "@/components/global/convert-date";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";

export type TTaskData = {
  id: string;
  name: string;
  status: string;
  description: string;
  tenantId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};
const TaskCard = ({ task, index }: { task: TTaskData; index: number }) => {
  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided) => (
        <Card
          className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted m-3"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="font-semibold">{task?.name}</div>
              <div className="ml-auto text-xs flex flex-row">
                <div className="ml-auto text-xs text-foreground">
                  {convertDate(task?.createdAt)}
                </div>
                <TaskDropdown task={task} />
              </div>
            </div>
            <div className="text-xs font-medium">
              Status:
              <Badge className="ml-2">{task?.status}</Badge>
            </div>
          </div>
          <div className="line-clamp-2 text-x5 text-muted-foreground">
            {task?.description}
          </div>
        </Card>
      )}
    </Draggable>
  );
};
export default TaskCard;
