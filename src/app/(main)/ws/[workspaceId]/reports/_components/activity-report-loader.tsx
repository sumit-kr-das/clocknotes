import formatActivityTime from "@/lib/format-activity-time";
import ActivityBar from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-bar";
import { Skeleton } from "@/components/ui/skeleton";

const ActivityReportLoader = () => {
  return (
    <div className="w-full rounded-sm border border-s  shadow">
      <Skeleton className="w-full h-[50px] overflow-hidden bg-white px-5 pb-5 pt-7.5 dark:bg-gray-800" />
      <div className="px-5 pb-5 pt-7.5">
        <Skeleton className="w-full h-[350px] mt-4" />
      </div>
    </div>
  );
};
export default ActivityReportLoader;
