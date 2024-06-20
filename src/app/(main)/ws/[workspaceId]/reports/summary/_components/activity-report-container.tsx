"use client";
import { useEffect, useState } from "react";
import ActivityBarContainer from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-bar-container";
import ActivityUserContainer from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-user-container";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  getWeeklyActivityReport,
  getActivityReportByProjects,
  getActivityReportByUsers,
} from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/actions/report.actions";
import ActivityFilter from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-filter";
import ActivityProjectContainer from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-project-container";
const ActivityReportContainer = () => {
  const [report, setReport] = useState<any>();
  const [projectReport, setProjectReport] = useState<any>();
  const [userReport, setUserReport] = useState<any>();
  const [filter, setFilter] = useState({
    projects: undefined,
    clients: undefined,
    tags: undefined,
    status: undefined,
    users: undefined,
  });
  const params = useParams<{ workspaceId: string }>();
  const getReport = async () => {
    try {
      const report = await getWeeklyActivityReport({
        workspaceId: params?.workspaceId,
        ...filter,
      });
      const projectData = await getActivityReportByProjects({
        workspaceId: params?.workspaceId,
        ...filter,
      });
      const userData = await getActivityReportByUsers({
        workspaceId: params?.workspaceId,
        ...filter,
      });
      setReport(report);
      setProjectReport(projectData);
      setUserReport(userData);
    } catch (e: any) {
      toast.error(e?.message);
    }
  };
  useEffect(() => {
    getReport();
  }, [filter]);
  return (
    <>
      <ActivityFilter setFilter={setFilter} />
      <ActivityBarContainer
        activity={{
          activities: report?.activities,
          dates: report?.dates,
          totalActivityTime: report?.totalActivityTime,
        }}
      />
      <h2 className="py-5">Detail Activity Charts</h2>
      <div className="flex justify-between">
        <ActivityProjectContainer data={projectReport} />
        <ActivityUserContainer data={userReport} />
      </div>
    </>
  );
};
export default ActivityReportContainer;
