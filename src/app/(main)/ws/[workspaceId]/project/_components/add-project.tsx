"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getClients } from "@/app/(main)/ws/[workspaceId]/client/_components/action/client.actions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TClient } from "@/type/client/TClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { addProject } from "@/app/api/project/project.actions";
import SubmitBtn from "@/components/global/customInputes/submit-btn";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name should be minimum 4 characters",
  }),
  client: z.string({
    required_error: "Client is required",
  }),
  workspaceId: z.string(),
});
const AddProject = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<TClient[]>();
  const params = useParams<{ workspaceId: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      workspaceId: params.workspaceId,
    },
  });
  async function submitProject(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await addProject({ data, path: "/project" });
      toast.success("Project added successfully");
      setOpen(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something gone wrong");
    }
  }

  async function getClientsData() {
    const client = await getClients({ workspaceId: params?.workspaceId });
    setClients(client);
  }
  useEffect(() => {
    getClientsData();
  }, []);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new project you will work on and add the associate client
              also.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitProject)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Choose Client</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? clients?.find(
                                  (client) => client.id === field.value,
                                )?.name
                              : "Select Client"}
                            {/*<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Select client..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {clients?.map((client) => (
                              <CommandItem
                                value={client?.name}
                                key={client?.id}
                                onSelect={() => {
                                  form.setValue("client", client?.id);
                                }}
                              >
                                {client.name}
                                {/*<CheckIcon*/}
                                {/*  className={cn(*/}
                                {/*    "ml-auto h-4 w-4",*/}
                                {/*    language.value === field.value*/}
                                {/*      ? "opacity-100"*/}
                                {/*      : "opacity-0",*/}
                                {/*  )}*/}
                                {/*/>*/}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitBtn isLoading={isLoading} label="Create Project" />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProject;
