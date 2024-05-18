import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";

const AddTags = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="w-14">
          <Tag className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add Tags</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AddTags;
