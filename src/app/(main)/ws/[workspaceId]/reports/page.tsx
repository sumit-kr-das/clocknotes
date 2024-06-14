import ActivityBarContainer from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-bar-container";
import {
  getActivityReport,
  getWeeklyActivityReport,
} from "@/app/(main)/ws/[workspaceId]/reports/_components/actions/report.actions";
const Reports = async ({ params }: any) => {
  const activity = await getWeeklyActivityReport({
    workspaceId: params.workspaceId,
  });
  console.log(activity, "activity");
  return (
    <div>
      <h1>Reports</h1>
      <ActivityBarContainer activity={activity} />
    </div>
  );
};
export default Reports;
