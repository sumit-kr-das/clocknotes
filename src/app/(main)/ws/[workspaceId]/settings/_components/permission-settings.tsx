import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TWSettings } from "@/type/settings/workspace-settings";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@prisma/client";
import toast from "react-hot-toast";
import { updateWorkspaceSetting } from "@/app/(main)/ws/[workspaceId]/settings/_components/actions/settings.actions";
const formSchema = z.object({
  projectPermission: z.enum(["ADMIN", "MANAGER", "MEMBER", "LEAD"]),
  clientPermission: z.enum(["ADMIN", "MANAGER", "MEMBER", "LEAD"]),
  tagPermission: z.enum(["ADMIN", "MANAGER", "MEMBER", "LEAD"]),
  timeSheetPermission: z.enum(["ADMIN", "MANAGER", "MEMBER", "LEAD"]),
  billingPermission: z.enum(["ADMIN", "MANAGER", "MEMBER", "LEAD"]),
});

const PermissionSettings = ({ settings }: { settings: TWSettings }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectPermission: settings?.projectPermission,
      clientPermission: settings?.clientPermission,
      tagPermission: settings?.tagPermission,
      timeSheetPermission: settings?.timeSheetPermission,
      billingPermission: settings?.billingPermission,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateWorkspaceSetting({ id: settings?.id!, ...values });
      toast.success("Permission settings updated");
    } catch (e: any) {
      toast.error(e?.message);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approve Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4 justify-between">
              <FormField
                control={form.control}
                name="projectPermission"
                render={({ field }) => (
                  <FormItem className="mt-3 flex-1">
                    <FormLabel>Who can manage projects</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Industry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(Role).map(([key, value]) => (
                              <SelectItem value={key} key={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientPermission"
                render={({ field }) => (
                  <FormItem className="mt-3 flex-1">
                    <FormLabel>Who can manage clients</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Industry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(Role).map(([key, value]) => (
                              <SelectItem value={key} key={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 justify-between">
              <FormField
                control={form.control}
                name="tagPermission"
                render={({ field }) => (
                  <FormItem className="mt-3 flex-1">
                    <FormLabel>Who can manage tags</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Industry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(Role).map(([key, value]) => (
                              <SelectItem value={key} key={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeSheetPermission"
                render={({ field }) => (
                  <FormItem className="mt-3 flex-1">
                    <FormLabel>Who can manage timesheet</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Industry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(Role).map(([key, value]) => (
                              <SelectItem value={key} key={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="billingPermission"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Who can do billing</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Industry Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(Role).map(([key, value]) => (
                            <SelectItem value={key} key={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default PermissionSettings;
