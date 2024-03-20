"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getClients } from "@/app/(main)/client/_components/action/client.actions";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { TClient } from "@/type/client/TClient";
import { addProject } from "@/app/api/project/project.actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name should be minimum 4 characters",
  }),
  client: z.string({
    required_error: "Client is required",
  }),
});
const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<TClient[]>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
    },
  });
  async function submitProject(data: z.infer<typeof formSchema>) {
    try {
      await addProject({ data, path: "/project" });
      toast.success("Project added successfully");
      setOpen(false);
    } catch (e) {
      toast.error("Something gone wrong");
    }
  }

  async function getClientsData() {
    const client = await getClients();
    setClients(client);
  }
  useEffect(() => {
    getClientsData();
  }, []);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Create New Project
          </Button>
        </DialogTrigger>
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
                                  (language) => language.id === field.value,
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProject;
