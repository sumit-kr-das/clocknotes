"use Client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addClient } from "@/app/(main)/ws/[workspaceId]/client/_components/action/client.actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "next/navigation";
import SubmitBtn from "@/components/global/customInputes/submit-btn";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a client",
  }),
  workspaceId: z.string(),
});

const AddClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ workspaceId: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      workspaceId: params?.workspaceId,
    },
  });
  async function addNewClient(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await addClient({ data, path: "/client" });
      toast.success("Client added successfully");
      form.reset({
        name: "",
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something wrong happen when adding client");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addNewClient)}
          className=" flex gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[330px]">
                <FormControl>
                  <Input placeholder="Add Client" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitBtn isLoading={isLoading} label="Add Client" />
        </form>
      </Form>
    </>
  );
};

export default AddClient;
