"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitBtn from "@/components/global/customInputes/submit-btn";
import { sendTeamInvitation } from "@/app/(main)/ws/[workspaceId]/teams/_components/actions/teams.action";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
});
const AddTeam = () => {
  const params = useParams<{ workspaceId: string }>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const addMember = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(params);
      await sendTeamInvitation({
        ...data,
        workspaceId: params.workspaceId,
      });
      toast.success("Member invitation sent");
      setOpen(false);
      setIsLoading(false);
    } catch (e: any) {
      toast.error(e?.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Member will be added in this teams after accepting the invite
            request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addMember)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitBtn isLoading={isLoading} label="Send Invite" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeam;
