"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SubmitBtn from "@/components/global/customInputes/submit-btn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addTags } from "@/app/(main)/ws/[workspaceId]/tags/_components/actions/tags.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Tags minimum should be 2 characters" })
    .max(15, { message: "Tags should not be more than 15 characters" }),
});
const AddTags = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function submitTags(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await addTags(data);
      form.reset({ name: "" });
      setIsLoading(false);
      toast.success("Tag added successfully");
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitTags)} className=" flex gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[330px]">
                <FormControl>
                  <Input placeholder="Add Tag" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitBtn isLoading={isLoading} label="Add Tag" />
        </form>
      </Form>
    </>
  );
};
export default AddTags;
