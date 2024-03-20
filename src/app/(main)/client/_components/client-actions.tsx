import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { TClient } from "@/type/client/TClient";
import EditClient from "@/app/(main)/client/_components/edit-client";
import { useState } from "react";
import { deleteClient } from "@/app/(main)/client/_components/action/client.actions";
import toast from "react-hot-toast";

const ClientActions = ({ client }: { client: TClient }) => {
  const [open, setOpen] = useState(false);
  const removeClient = async () => {
    try {
      await deleteClient(client.id);
      toast.success("Client deleted successfully");
    } catch (e) {
      toast.error("Something gone wrong");
    }
  };
  return (
    <>
      <EditClient client={client} open={open} setOpen={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(!open)}>
            <Pencil /> <span className="ml-4">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => removeClient()}>
            <Trash /> <span className="ml-4">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ClientActions;
