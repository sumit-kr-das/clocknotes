import { useState } from "react";
import EditTags from "@/app/(main)/tags/_components/edit-tags";
import DeleteTags from "@/app/(main)/tags/_components/delete-tags";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TTags } from "@/type/tags/TTags";

const TagsAction = ({ tags }: { tags: TTags }) => {
  const [delOpen, setDelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <EditTags open={open} setOpen={setOpen} tagId={tags.id} tags={tags} />
      <DeleteTags delOpen={delOpen} setDelOpen={setDelOpen} tagId={tags.id} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="mr-3" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDelOpen(true)}>
            <Trash2 className="mr-3" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default TagsAction;
