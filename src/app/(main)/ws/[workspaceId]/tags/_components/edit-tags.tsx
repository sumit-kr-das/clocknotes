"use client";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import BaseInput from "@/components/global/customInputes/base-input";
import SubmitBtn from "@/components/global/customInputes/submit-btn";
import { useEffect, useState } from "react";
import { TTags } from "@/type/tags/TTags";
import {
  editTag,
  getTagDetail,
} from "@/app/(main)/ws/[workspaceId]/tags/_components/actions/tags.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Tag should be minimum 2 characters",
    })
    .max(15, {
      message: "Tag should not be more than 15 characters",
    }),
});
const EditTags = ({
  open,
  setOpen,
  tagId,
  tags,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  tagId: string;
  tags: TTags;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [tag, setTag] = useState<TTags>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tags?.name || "",
    },
  });
  async function onUpdateTag(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await editTag({ tagId, data });
      setIsLoading(false);
      setOpen(false);
      toast.success("Tag edited successfully");
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdateTag)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <BaseInput
                  field={field}
                  placeholder="Tag name"
                  label="Tag Name"
                />
              )}
            />
            <SubmitBtn isLoading={isLoading} label="Update Tag" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditTags;
