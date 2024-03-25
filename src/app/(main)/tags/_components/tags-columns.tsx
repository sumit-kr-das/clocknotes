"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TTags } from "@/type/tags/TTags";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import TagsAction from "@/app/(main)/tags/_components/tags-action";

export const columns: ColumnDef<TTags>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tags = row.original;
      return <TagsAction tags={tags} />;
    },
  },
];
