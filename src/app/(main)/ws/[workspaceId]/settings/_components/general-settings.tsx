"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageSettings from "@/app/(main)/ws/[workspaceId]/settings/_components/image-settings";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TWSettings } from "@/type/settings/workspace-settings";
import toast from "react-hot-toast";
import { updateWorkspaceSetting } from "@/app/(main)/ws/[workspaceId]/settings/_components/actions/settings.actions";

const formSchema = z.object({
  companyName: z.string().max(50),
  name: z.string().min(2).max(15),
  currency: z.string(),
  defaultRate: z.string(),
});

const GeneralSettings = ({ settings }: { settings: TWSettings }) => {
  const [image, setImage] = useState<File | null>(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: settings?.companyName || "",
      name: settings?.name,
      currency: settings?.currency,
      defaultRate: settings?.defaultRate?.toString() || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const query: any = {
      ...values,
      id: settings?.id || "",
    };
    try {
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "clocknotes");
        data.append("cloud_name", "clocknotes");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/clocknotes/image/upload",
          {
            method: "POST",
            body: data,
          },
        );
        const result = await response.json();
        query.companyLogo = result?.url;
      }
      await updateWorkspaceSetting(query);
      toast.success("General setting updated");
    } catch (e: any) {
      toast.error(e?.message);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <ImageSettings
            image={image}
            setImage={setImage}
            companyLogo={settings?.companyLogo || ""}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 justify-between mb-3">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Workspace Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 justify-between mb-3">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
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
              <FormField
                control={form.control}
                name="defaultRate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Default Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="Default Rate" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default GeneralSettings;
