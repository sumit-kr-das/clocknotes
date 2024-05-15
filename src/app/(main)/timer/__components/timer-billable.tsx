import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";

const Billable = ({ handleTimerStates, timerStates }) => {
  const handleBillable = () => {
    if (timerStates.isBillable) {
      handleTimerStates({ isBillable: false });
      console.log(true);
    } else {
      handleTimerStates({ isBillable: true });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {timerStates.isBillable ? (
          <Button
            type="button"
            size="icon"
            className="w-14"
            onClick={handleBillable}
          >
            <DollarSign className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-14"
            onClick={handleBillable}
          >
            <DollarSign className="w-4 h-4" />
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>Billable</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Billable;
