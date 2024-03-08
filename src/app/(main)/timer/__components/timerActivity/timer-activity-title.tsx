import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { updateTitle } from "@/app/(main)/timer/__components/timerActivity/activity-action";
import { Input } from "@/components/ui/input";
import React from "react";

type ActivityTitle = {
  id: string;
  title: string;
};

const ActivityTitle = ({ id, title }: ActivityTitle) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <h2 className="text-lg font-semibold">{title}</h2>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4 " align="start">
        <form
          action={async (data) => await updateTitle(data)}
          className="flex items-center gap-4"
        >
          <input type="hidden" name="id" defaultValue={id} />
          <Input name="name" defaultValue={title} placeholder="Update title" />
          <Button type="submit">Save</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityTitle;
