"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TProject } from "@/type/project/TProject";
import ProjectActions from "@/app/(main)/ws/[workspaceId]/project/_components/project-actions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TProject>[] = [
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
    accessorKey: "client.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tracked",
    header: "Tracked",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return <ProjectActions project={project} />;
    },
  },
];
