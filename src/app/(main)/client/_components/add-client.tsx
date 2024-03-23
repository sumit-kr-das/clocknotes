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
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a client",
  }),
});
import { addClient } from "@/app/(main)/client/_components/action/client.actions";
import toast from "react-hot-toast";

const AddClient = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  async function addNewClient(data: z.infer<typeof formSchema>) {
    try {
      await addClient({ data, path: "/client" });
      toast.success("Client added successfully");
      form.reset({
        name: "",
      });
    } catch (e) {
      console.log(e);
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
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </>
  );
};

export default AddClient;
