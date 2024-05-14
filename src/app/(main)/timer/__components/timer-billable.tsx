import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";

const Billable = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="w-14">
          <DollarSign className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Billable</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Billable;
