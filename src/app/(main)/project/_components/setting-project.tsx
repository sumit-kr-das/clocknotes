"use client";
import { z } from "zod";
import { TProject } from "@/type/project/TProject";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { TClient } from "@/type/client/TClient";
import { getClients } from "@/app/(main)/client/_components/action/client.actions";
import { CheckIcon } from "lucide-react";
import solids from "@/constants/solids";
import toast from "react-hot-toast";
import "@/style/style.css";
import { editProject } from "@/app/api/project/project.actions";
import BaseInput from "@/components/global/customInputes/base-input";
import BaseSwitch from "@/components/global/customInputes/base-switch";
import BaseSelect from "@/components/global/customInputes/base-select";
import BaseCombobox from "@/components/global/customInputes/base-combobox";
import ProjectEditSchema from "@/type/zod/ProjectEditSchema";
import SubmitBtn from "@/components/global/customInputes/submit-btn";

const SettingProject = ({
  project,
  open,
  setOpen,
}: {
  project: TProject;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [clients, setClients] = useState<TClient[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState<string>(project?.color || "#ffff");
  const form = useForm<z.infer<typeof ProjectEditSchema>>({
    resolver: zodResolver(ProjectEditSchema),
    defaultValues: {
      name: project?.name || "",
      client: project?.clientId || "",
      isBillable: project?.isBillable || false,
      rate: project?.rate?.toString() || "0",
      currencyType: project?.currencyType || "",
      color: project?.color || color,
    },
  });
  const options = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "INR",
      value: "INR",
    },
  ];
  async function getClientsData() {
    const client = await getClients();
    setClients(client);
  }
  const setColorButton = (color: string, field: any) => {
    setColor(color);
    field.onChange(color);
    toast.success("Color selected");
  };
  const basicSetting = async (data: z.infer<typeof ProjectEditSchema>) => {
    try {
      setIsLoading(true);
      await editProject({
        data: { ...data, rate: parseInt(data?.rate) },
        projectId: project?.id,
      });
      setOpen(false);
      toast.success("Project settings updated successfully");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("An error occured while setting");
    }
  };
  useEffect(() => {
    getClientsData();
  }, []);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded scrollbar-hide overflow-y-scroll max-h-[530px]">
          <DialogHeader>
            <DialogTitle>Setting Project</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="access">Access Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(basicSetting)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <BaseInput
                        placeholder="Name"
                        label="Name"
                        field={field}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <BaseCombobox
                        label="Select Client"
                        placeholder="Select client"
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? clients?.find(
                                      (language) => language.id === field.value,
                                    )?.name
                                  : "Select Client"}
                                {/*<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Select client..."
                                className="h-9"
                              />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {clients?.map((client) => (
                                  <CommandItem
                                    value={client?.name}
                                    key={client?.id}
                                    onSelect={() => {
                                      form.setValue("client", client?.id);
                                    }}
                                  >
                                    {client.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        client.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </BaseCombobox>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                      <FormItem className="mt-3">
                        <FormLabel>Select Color</FormLabel>
                        <FormControl>
                          <Controller
                            name="color"
                            control={form.control}
                            render={({ field }) => (
                              <>
                                <div className="flex flex-wrap gap-1 mt-0">
                                  <Input type="hidden" />
                                  {solids.map((s) => (
                                    <div
                                      key={s}
                                      style={{ background: s }}
                                      className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                                      onClick={() => setColorButton(s, field)}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isBillable"
                    render={({ field }) => (
                      <BaseSwitch
                        field={field}
                        label={"Turn on billable"}
                        description={
                          "If project is billable it generate the total invoice for clients"
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currencyType"
                    render={({ field }) => (
                      <BaseSelect
                        field={field}
                        placeholder={"Select currenct"}
                        options={options}
                        label={"Select Currency"}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <BaseInput
                        field={field}
                        label="Project Billable Rates"
                        description=" Set your billable hourly rate. This will be used in
                         calculating your billable amount"
                        placeholder="100"
                      />
                    )}
                  />
                  <SubmitBtn isLoading={isLoading} label="Update Setting" />
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="access">
              Multiple user access will added soon.
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingProject;
