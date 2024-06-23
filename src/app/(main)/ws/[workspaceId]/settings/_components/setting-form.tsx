"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/app/(main)/ws/[workspaceId]/settings/_components/general-settings";
import { TWSettings } from "@/type/settings/workspace-settings";
import PermissionSettings from "@/app/(main)/ws/[workspaceId]/settings/_components/permission-settings";

const SettingForm = ({ settings }: { settings: TWSettings }) => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Workspace Settings</h1>
      <Tabs defaultValue="general" className="w-[full]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings settings={settings} />
        </TabsContent>
        <TabsContent value="approvals">
          <PermissionSettings settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default SettingForm;
