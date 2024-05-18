"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import { getDate } from "@/components/global/get-date";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "amount_paid",
    header: () => "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount_paid")) / 10;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: number = row.getValue("created");
      const formatted = getDate(new Date(date * 1000));
      return <div className="font-medium">{`${formatted}`}</div>;
    },
  },
  {
    accessorKey: "invoice_pdf",
    header: () => <div className="text-left"></div>,
    cell: ({ row }) => {
      const downloadLink: string = row.getValue("invoice_pdf") || "";

      return (
        <div className="text-right">
          <Link href={downloadLink}>
            <Button type="button">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </Link>
        </div>
      );
    },
  },
];
