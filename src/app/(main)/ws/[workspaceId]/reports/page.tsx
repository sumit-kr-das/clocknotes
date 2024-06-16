import ActivityBarContainer from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-bar-container";
import {
  // getActivityReport,
  getWeeklyActivityReport,
} from "@/app/(main)/ws/[workspaceId]/reports/_components/actions/report.actions";
import ActivityFilter from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-filter";
import ActivityReportContainer from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-report-container";
const Reports = async ({ params }: any) => {
  const activity = await getWeeklyActivityReport({
    workspaceId: params.workspaceId,
  });
  console.log(activity, "activity");
  return (
    <div>
      {/*<ActivityFilter />*/}
      {/*<ActivityBarContainer activity={activity} />*/}
      <ActivityReportContainer />
    </div>
  );
};
export default Reports;
