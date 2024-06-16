"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFilterReportData } from "@/app/(main)/ws/[workspaceId]/reports/_components/actions/report.actions";
const FilterSchema = z.object({
  projects: z.array(z.string()),
  tags: z.array(z.string()),
  users: z.array(z.string()),
  status: z.array(z.boolean()),
  clients: z.array(z.string()),
});

const ActivityFilter = ({ setFilter }: { setFilter: Function }) => {
  const [project, setProject] = useState<{ id: string; name: string }[]>();
  const [user, setUsers] = useState<({ id: string; name: string } | null)[]>();
  const [client, setClient] = useState<{ id: string; name: string }[]>();
  const [tags, setTags] = useState<{ id: string; name: string }[]>();
  const [status, setStatus] = useState<{ name: string; value: boolean }[]>();
  const params = useParams<{ workspaceId: string }>();

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      projects: [],
      tags: [],
      users: [],
      status: [],
      clients: [],
    },
  });

  const getProjects = async () => {
    try {
      const data = await getFilterReportData({
        workspaceId: params.workspaceId,
      });
      setProject(data?.projects);
      setTags(data?.tags);
      setClient(data?.clients);
      setUsers(data?.users);
      setStatus(data?.status);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  };

  function FilterReports(data: z.infer<typeof FilterSchema>) {
    setFilter(data);
  }

  useEffect(() => {
    getProjects();
    console.log("console ");
  }, []);

  return (
    <div className="w-full rounded-sm mb-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(FilterReports)}
          className=" flex justify-between w-full"
        >
          <div className="w-[75%] flex gap-4">
            <FormField
              control={form.control}
              name="projects"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[100px]">
                        Projects <ChevronDown className="mr-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 px-4">
                      <DropdownMenuLabel>Select Projects</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {project?.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="projects"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item?.id}
                                className="flex flex-row items-start space-x-3 space-y-0 my-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clients"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[100px]">
                        Client <ChevronDown className="mr-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 px-4">
                      <DropdownMenuLabel>Select Client</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {client?.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="clients"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 my-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="users"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Teams <ChevronDown className="mr-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 px-4">
                      <DropdownMenuLabel>Select Members</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {user?.map((item) => (
                        <FormField
                          key={item?.id}
                          control={form.control}
                          name="users"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item?.id}
                                className="flex flex-row items-start space-x-3 space-y-0 my-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      item?.id || "",
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item?.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item?.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item?.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Tags <ChevronDown className="mr-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 px-4">
                      <DropdownMenuLabel>Select Tags</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {tags?.map((item) => (
                        <FormField
                          key={item?.id}
                          control={form.control}
                          name="tags"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item?.id}
                                className="flex flex-row items-start space-x-3 space-y-0 my-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item?.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Status <ChevronDown className="mr-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 px-4">
                      <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {status?.map((item) => (
                        <FormField
                          key={item.name}
                          control={form.control}
                          name="status"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.name}
                                className="flex flex-row items-start space-x-3 space-y-0 my-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item?.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item?.value,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Apply Filter</Button>
        </form>
      </Form>
    </div>
  );
};
export default ActivityFilter;
