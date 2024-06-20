"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import getActivityTime from "@/lib/get-activity-time";
import formatActivityTime from "@/lib/format-activity-time";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// export type Payment = {
//   id: string;
//   project: string;
//   name: string;
//   member: string;
//   duration: string;
//   time: string;
//   isBillable: string;
//   cost: number;
// };

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data: { name: string } = row.getValue("project");
      return data?.name;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data: { name: string } = row.getValue("user");
      return data?.name;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    enableSorting: true,
    cell: ({ row }) => {
      const diff = getActivityTime(row.original.startAt, row.original.endAt);
      return formatActivityTime(diff);
    },
  },
  {
    accessorKey: "startAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startTime = dayjs(row.original.startAt).format("h:mm A");
      const endTime = dayjs(row.original.endAt).format("h:mm A");
      const date = dayjs(row.original.endAt).format("YYYY-MM-DD");
      return (
        <span>
          {startTime} - {endTime} <br /> {date}
        </span>
      );
    },
  },
  {
    accessorKey: "isBillable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Billable
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const billable = row.getValue("isBillable");
      return billable ? <span>Billable</span> : <span>Non Billable</span>;
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const { startAt, endAt, isBillable, project } = row.original;
      if (!isBillable) return <span>0.00 {project?.currencyType}</span>;
      const time = getActivityTime(startAt, endAt);
      const price = time * project?.rate;
      return (
        <span>
          {price.toFixed(2)} {project?.currencyType}
        </span>
      );
    },
  },
];
