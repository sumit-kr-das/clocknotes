"use client";
import { useEffect, useState } from "react";
import ActivityBarContainer from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-bar-container";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getWeeklyActivityReport } from "@/app/(main)/ws/[workspaceId]/reports/_components/actions/report.actions";
import ActivityFilter from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-filter";
const ActivityReportContainer = () => {
  const [report, setReport] = useState<any>();
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
      console.log({ ...filter }, "filter");
      const report = await getWeeklyActivityReport({
        workspaceId: params.workspaceId,
        ...filter,
      });
      setReport(report);
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
      <ActivityBarContainer activity={report} />
    </>
  );
};
export default ActivityReportContainer;
