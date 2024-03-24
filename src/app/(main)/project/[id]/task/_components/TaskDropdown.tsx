import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import EditTask from "@/app/(main)/project/[id]/task/_components/edit-task";
import { TTaskData } from "@/app/(main)/project/[id]/task/_components/task-card";
import DeleteTask from "@/app/(main)/project/[id]/task/_components/delete-task";
const TaskDropdown = ({ task }: { task: TTaskData }) => {
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  return (
    <>
      <EditTask open={open} setOpen={setOpen} task={task} />
      <DeleteTask taskId={task?.id} open={delOpen} setOpen={setDelOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Pencil /> <span className="ml-4">Pencil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDelOpen(true)}>
              {" "}
              <Trash2 /> <span className="ml-4">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default TaskDropdown;
