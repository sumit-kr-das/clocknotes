"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { createWorkspace } from "@/app/(main)/ws/actions/workspace.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name should be minimum 4 characters",
  }),
  type: z.string({
    required_error: "Client is required",
  }),
});
const AddWorkspace = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });
  const router = useRouter();

  const submitWorkspace = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const workspace = await createWorkspace(data);
      toast.success("Workspace created successfully");
      setOpen(false);
      setIsLoading(false);
      router.push(`/ws/${workspace.id}/timer`);
    } catch (e: any) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new workspace</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitWorkspace)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Type" {...field} />
                    </FormControl>
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
export default AddWorkspace;
