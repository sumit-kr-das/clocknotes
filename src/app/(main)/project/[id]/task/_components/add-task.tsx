"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import BaseInput from "@/components/global/customInputes/base-input";
import BaseTextarea from "@/components/global/customInputes/base-textarea";
import { useParams } from "next/navigation";
import { addTask } from "@/app/(main)/project/[id]/task/_components/action/task.actions";
import toast from "react-hot-toast";
import { useState } from "react";
import SubmitBtn from "@/components/global/customInputes/submit-btn";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter name",
    })
    .max(40, {
      message: "Name should be under 40 characters",
    }),
  description: z
    .string()
    .min(1, {
      message: "Please enter description",
    })
    .max(120, {
      message: "Description should be under 120 characters",
    }),
});
const AddTask = () => {
  const [open, setOpem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const projectId = params.id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function createTask(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await addTask({ data, projectId: projectId });
      setOpem(false);
      form.reset();
      toast.success("Task added successfully");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setOpem(false);
      toast.error("Failed to create task");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpem}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createTask)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <BaseInput
                  field={field}
                  placeholder="Enter Name"
                  label="Task Name"
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <BaseTextarea
                  field={field}
                  placeholder="Enter description"
                  label="Task Description"
                />
              )}
            />
            <SubmitBtn isLoading={isLoading} label="Create" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddTask;
