import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "@prisma/client";
import { Plus } from "lucide-react";
import AddProject from "../../project/_components/add-project";
import { TimerStates } from "./new-ativity";

const AddTimerProject = ({
  projects,
  timerStates,
  handleTimerStates,
}: {
  projects?: Project[];
  timerStates: TimerStates;
  handleTimerStates: (timerStates: TimerStates) => void;
}) => {
  const handleSelect = (projectName: string, projectId: string) => {
    handleTimerStates({
      projectName: projectName,
      projectId: projectId,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" className="w-28">
          {timerStates?.projectName ? (
            <span>{timerStates?.projectName}</span>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1" />
              <span className="text-sm">Project</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-full">
          <Input placeholder="Search project or client" />
          <div className="p-4">
            {projects ? (
              <ul className="flex flex-col gap-2 list-disc">
                {projects?.map((project, index) => (
                  <li
                    onClick={() => handleSelect(project?.name, project?.id)}
                    className={`cursor-pointer ${project.color !== null}  ? text-[${project.color}] : ""`}
                    key={index}
                  >
                    {project?.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No project found</p>
            )}
          </div>
          <AddProject>
            <Button className="w-full">Add a new project</Button>
          </AddProject>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddTimerProject;
