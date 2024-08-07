"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import BaseInput from "@/components/global/customInputes/base-input";
import BaseTextarea from "@/components/global/customInputes/base-textarea";
import { useState } from "react";
import TTask from "@/type/task/task";
import { TTaskData } from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/task-card";
import { useParams } from "next/navigation";
import { taskUpdate } from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/action/task.actions";
import toast from "react-hot-toast";
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
const EditTask = ({
  open,
  setOpen,
  task,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: TTaskData;
}) => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const projectId = params.id;

  async function updateTask(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await taskUpdate({ taskId: task?.id, projectId, data });
      toast.success("Task edited successfully");
      setOpen(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name || "",
      description: task?.description || "",
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateTask)} className="space-y-8">
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
            <SubmitBtn isLoading={isLoading} label="Edit Task" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
