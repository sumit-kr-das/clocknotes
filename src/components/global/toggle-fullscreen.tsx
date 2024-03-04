"use client";

import React from "react";
import { Button } from "../ui/button";
import { Expand } from "lucide-react";

const ToggleFullScreen = () => {
  return (
    <div>
      <Button variant="outline" size="icon">
        <Expand
          className="w-5 h-5"
          onClick={() => document.body.requestFullscreen()}
        />
        {/* <Shrink /> */}
      </Button>
    </div>
  );
};

export default ToggleFullScreen;
