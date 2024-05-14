import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddProject = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button">
          <Plus className="w-4 h-4 mr-2" />
          <p className="text-sm">Project</p>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add Project</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AddProject;
