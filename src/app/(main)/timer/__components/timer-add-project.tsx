import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import AddProject from "../../project/_components/add-project";

const AddTimerProject = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button">
          <Plus className="w-4 h-4 mr-2" />
          <p className="text-sm">Project</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-full">
          <Input placeholder="Search project or client" />
          <div className="p-4">
            {/* <DisplayTasks /> */}
            <p>No project found</p>
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
