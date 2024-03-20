import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutList, MoreHorizontal, Settings, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { TProject } from "@/type/project/TProject";
import { deleteProject } from "@/app/api/project/project.actions";
import SettingProject from "@/app/(main)/project/_components/setting-project";
import { redirect } from "next/navigation";

const ProjectActions = ({ project }: { project: TProject }) => {
  const [open, setOpen] = useState(false);
  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfull");
    } catch (e) {
      toast.error("Something gone wrong");
    }
  };
  return (
    <>
      <SettingProject project={project} open={open} setOpen={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(!open)}>
            <Settings /> <span className="ml-4">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => removeProject(project?.id)}>
            <Trash /> <span className="ml-4">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => redirect(`${project?.id}/task`)}>
            <LayoutList /> <span className="ml-4">Tasks</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProjectActions;
