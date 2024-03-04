"use client";

import React from "react";
import { Button } from "../ui/button";
import { Expand } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ToggleFullScreen = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Expand
            className="w-5 h-5"
            onClick={() => document.body.requestFullscreen()}
          />
          {/* <Shrink /> */}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Full screen mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ToggleFullScreen;
