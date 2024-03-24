"use Client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editClient } from "@/app/(main)/client/_components/action/client.actions";
import { TClient } from "@/type/client/TClient";
import toast from "react-hot-toast";
import { useState } from "react";
import SubmitBtn from "@/components/global/customInputes/submit-btn";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is requied",
  }),
  email: z.string(),
  address: z.string(),
  note: z.string(),
  currency: z.string(),
});
const EditClient = ({
  client,
  open,
  setOpen,
}: {
  client: TClient;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      address: client?.address || "",
      note: client?.note || "",
      currency: client?.currency || "",
    },
  });

  async function updateClient(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await editClient({ data, path: "/client", clientId: client.id });
      setOpen(false);
      toast.success("Client edited successfull");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something gone wrong");
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client Details</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updateClient)} className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Add Client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormControl>
                      <Input placeholder="Add Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormControl>
                      <Textarea placeholder="Client Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormControl>
                      <Textarea placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitBtn isLoading={isLoading} label="Update" />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditClient;
