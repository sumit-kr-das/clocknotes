"use server";
import { getWorkspaceSettings } from "@/app/(main)/ws/[workspaceId]/settings/_components/actions/settings.actions";
import SettingForm from "@/app/(main)/ws/[workspaceId]/settings/_components/setting-form";
const Settings = async ({ params }: any) => {
  const settings = await getWorkspaceSettings({
    workspaceId: params?.workspaceId,
  });
  console.log(settings, "settings");
  return (
    <>
      <SettingForm settings={settings} />
    </>
  );
};
export default Settings;
